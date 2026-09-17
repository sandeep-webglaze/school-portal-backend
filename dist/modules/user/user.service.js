"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const utils_1 = require("../../lib/utils");
const exceptions_1 = require("../../lib/exceptions");
const constants_1 = require("../../lib/constants");
const otp_service_1 = require("../otp/otp.service");
const auth_service_1 = require("../auth/auth.service");
const wallets_service_1 = require("../wallets/wallets.service");
const upload_service_1 = require("../upload/upload.service");
const user_repository_1 = require("./user.repository");
const user_entity_1 = require("./entities/user.entity");
const shared_1 = require("../../lib/shared");
const mails_handler_1 = require("../mails-handler");
let UserService = class UserService {
    constructor(connection, repository, uploadService, authService, otpService, walletService, smsService, mailEvents, firebaseAdmin) {
        this.connection = connection;
        this.repository = repository;
        this.uploadService = uploadService;
        this.authService = authService;
        this.otpService = otpService;
        this.walletService = walletService;
        this.smsService = smsService;
        this.mailEvents = mailEvents;
        this.firebaseAdmin = firebaseAdmin;
    }
    async findOrCreateUser(userDto) {
        let user = await this.repository.findOne({
            mail: userDto.mail,
        });
        if (!(0, class_validator_1.isEmpty)(user))
            return user;
        const newUser = await this.repository.create(userDto);
        return newUser.data;
    }
    async findOrCreateUserByPhone(userDto) {
        let user = await this.repository.findOne({
            phoneNumber: userDto.phoneNumber,
        });
        if (!(0, class_validator_1.isEmpty)(user))
            return user;
        const newUser = await this.repository.create(userDto);
        return newUser.data;
    }
    async create(createUserDto) {
        const user = await this.findOne({ mail: createUserDto.mail });
        if (user != null)
            throw new exceptions_1.UserAlreadyExistsException();
        return this.repository.create(createUserDto);
    }
    async registerSchoolUser(createDto) {
        const claimedUser = await this.repository.findOne({
            school: createDto.school,
        });
        if (claimedUser != null)
            throw new common_1.BadRequestException('School already claimed, Please contact us for any query');
        return this.create(createDto);
    }
    async verifyAndCreateUser({ otp, ...userData }) {
        await this.otpService.validateOtpForPhone(userData.phoneNumber, otp);
        userData.verificationStatus = constants_1.USER_VERIFICATION_STATUS.VERIFIED;
        let user = await this.findOrCreateUserByPhone(userData);
        const access_token = await this.authService.generateAccessToken(user);
        const { password, ...userDate } = user.toJSON();
        return { ...userDate, access_token };
    }
    findAll(user, filterDto) {
        const { limit, skip, ...filter } = (0, utils_1.createPaginatedMongoOptions)(filterDto);
        if (user.role !== constants_1.USER_ROLE.ADMIN)
            filter.role = constants_1.USER_ROLE.USER;
        return this.repository.findAll({
            filter: {
                name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
                mail: filter.mail && { $regex: `^${filter.mail}`, $options: 'i' },
                phoneNumber: filter.phoneNumber && {
                    $regex: `^${filter.phoneNumber}`,
                    $options: 'i',
                },
                role: filter.role,
                verificationStatus: filter.verificationStatus,
                status: filter.status,
            },
            options: {
                skip,
                limit,
                sort: { createdAt: -1 },
                populate: [
                    {
                        path: 'school',
                        options: { projection: 'slug name' },
                    },
                ],
            },
        });
    }
    findOne(user) {
        return this.repository.findOne({ ...user });
    }
    findOneById(id) {
        return this.repository.findById(id);
    }
    removeProfileImage(userId) {
        return this.repository.entity.updateOne({ _id: userId }, { $unset: { imageUrl: '' } });
    }
    async update(userId, updateUserDto) {
        const user = await this.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not Found');
        if (updateUserDto.password) {
            updateUserDto.password = await (0, user_entity_1.hashUserPassword)(updateUserDto.password);
        }
        if (updateUserDto.imageUrl != null) {
            await this.uploadService.checkAndRemoveOldFile(user.imageUrl, updateUserDto.imageUrl);
        }
        return this.repository.updateById(userId, updateUserDto);
    }
    async updateProfile(user, updateDto) {
        if (updateDto.password) {
            const isDifferentPassword = this.authService
                .validatePassword(user.password, updateDto.password)
                .then(() => true)
                .catch((_) => false);
            if (!isDifferentPassword) {
                throw new common_1.BadRequestException('new password must be different from current password');
            }
            updateDto.password = await (0, user_entity_1.hashUserPassword)(updateDto.password);
        }
        if (updateDto.imageUrl || updateDto.imageUrl === null) {
            await this.uploadService.checkAndRemoveOldFile(user.imageUrl, updateDto.imageUrl);
        }
        return await this.repository.updateById(user._id, updateDto);
    }
    async toggleVerificationStatus(toggleDto) {
        return this.repository.updateMany({ _id: toggleDto.userIds }, { verificationStatus: toggleDto.verificationStatus });
    }
    async findAndUpdate(userId, updateBody) {
        const user = await this.repository.findOne({ _id: userId });
        if (!user)
            throw new common_1.NotFoundException('User not Found');
        if (updateBody.password) {
            updateBody.password = await (0, user_entity_1.hashUserPassword)(updateBody.password);
        }
        if (updateBody.imageUrl != null) {
            await this.uploadService.checkAndRemoveOldFile(user.imageUrl, updateBody.imageUrl);
        }
        const response = await this.repository.updateById(userId, updateBody);
        return response;
    }
    async remove(id) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();
        try {
            const deleteResponse = await this.repository.deleteById(id, {
                session: transactionSession,
            });
            this.walletService.deleteUserWallet(id, { session: transactionSession });
            await transactionSession.commitTransaction();
            return deleteResponse;
        }
        catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        }
    }
    getPlatform(domain) {
        switch (true) {
            case new RegExp(/^https?:\/\/(?:[^.]+\.)?schoolsofdehradun\.com(?:[:/]|$)/).test(domain):
                return constants_1.PLATFORMS.SOD;
            case new RegExp(/^https?:\/\/(?:[^.]+\.)?edhippo\.com(?:[:/]|$)/).test(domain):
                return constants_1.PLATFORMS.EDHIPPO;
            default:
                return constants_1.PLATFORMS.EDHIPPO_APP;
        }
    }
    async sendVerificationOtpToPhone(user, newPhone) {
        if (user.phoneNumber == newPhone)
            throw new common_1.BadRequestException('Phone Number Already Verified!');
        const otp = await this.otpService.generateAndSaveOtpForPhone({
            phoneNumber: newPhone,
            userId: user._id,
        });
        if (otp.created) {
            this.smsService.sendSms(otp.data.phoneNumber, otp.data.otp);
        }
        return {
            userId: user._id,
            mobie: newPhone,
            timeout: otp.data.timeout,
        };
    }
    async verifyPhoneAndUpdate(phoneNumber, otp) {
        const { isVerified, userId } = await this.otpService.validateOtpForPhone(phoneNumber, otp);
        if (!isVerified || !userId)
            throw new common_1.NotFoundException('User Not Found!');
        return await this.repository.updateById(userId.toString(), { phoneNumber });
    }
    async sendVerificationOtpToEmail(user, newMail) {
        if (user.mail == newMail)
            throw new common_1.BadRequestException('Email Already Verified!');
        const otp = await this.otpService.generateAndSaveOtpForEmail({
            email: newMail,
            userId: user._id,
            phoneNumber: user.phoneNumber,
        });
        user.mail = newMail;
        if (otp.created) {
            this.mailEvents.forgotPasswordOtpMail(user, otp.data);
        }
        console.log('Sending OTP to email:', newMail, otp.data.otp);
        return {
            userId: user._id,
            email: newMail,
            timeout: otp.data.timeout,
        };
    }
    async verifyMailAndUpdate(email, otp) {
        const { isVerified, userId } = await this.otpService.validateOtpForEmail(email, otp);
        if (!isVerified || !userId)
            throw new common_1.NotFoundException('User Not Found!');
        console.log('Updating user email:', userId, email);
        return await this.repository.updateById(userId.toString(), { mail: email });
    }
    async firebaseLogin({ idToken, ...userData }) {
        const decodedToken = await this.firebaseAdmin
            .getAuth()
            .verifyIdToken(idToken);
        let phoneNumber = decodedToken.phone_number;
        if (phoneNumber.startsWith('+91')) {
            phoneNumber = phoneNumber.slice(3);
        }
        userData.phoneNumber = phoneNumber;
        userData.verificationStatus = constants_1.USER_VERIFICATION_STATUS.VERIFIED;
        let user = await this.findOrCreateUserByPhone(userData);
        const access_token = await this.authService.generateAccessToken(user);
        const { password, ...userDate } = user.toJSON();
        return { ...userDate, access_token };
    }
    async verifyPhoneNumberByFireBase(user, idToken) {
        const decodedToken = await this.firebaseAdmin
            .getAuth()
            .verifyIdToken(idToken);
        const phoneNumber = decodedToken.phone_number;
        if (!phoneNumber) {
            throw new common_1.NotFoundException('Phone number not found in token');
        }
        let formattedPhone = phoneNumber;
        if (phoneNumber.startsWith('+91')) {
            formattedPhone = phoneNumber.slice(3);
        }
        if (user.phoneNumber === formattedPhone) {
            throw new common_1.BadRequestException('Phone Number Already Verified!');
        }
        return await this.repository.updateById(user._id, {
            phoneNumber: formattedPhone,
        });
    }
    async firebaseLoginByGoogle({ idToken, ...userData }) {
        const decodedToken = await this.firebaseAdmin
            .getAuth()
            .verifyIdToken(idToken);
        const email = decodedToken.email;
        const name = decodedToken.name;
        const imageUrl = decodedToken.picture;
        console.log('Decoded Token:', decodedToken);
        if (!email) {
            throw new common_1.NotFoundException('Email not found in token');
        }
        userData.mail = email;
        userData.name = name;
        userData.imageUrl = imageUrl;
        userData.verificationStatus = constants_1.USER_VERIFICATION_STATUS.VERIFIED;
        let user = await this.findOrCreateUser(userData);
        const access_token = await this.authService.generateAccessToken(user);
        const { password, ...userDate } = user.toJSON();
        return { ...userDate, access_token };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectConnection)()),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_1.Connection,
        user_repository_1.UserRepository,
        upload_service_1.UploadService,
        auth_service_1.AuthService,
        otp_service_1.OtpService,
        wallets_service_1.WalletsService,
        shared_1.SMSService,
        mails_handler_1.MailEvents,
        shared_1.FirebaseAdmin])
], UserService);
//# sourceMappingURL=user.service.js.map