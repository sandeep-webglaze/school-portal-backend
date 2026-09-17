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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../lib/constants");
const city_service_1 = require("../city/city.service");
const slug_service_1 = require("../slug/slug.service");
const city_filter_dto_1 = require("../city/dto/city-filter.dto");
const school_filter_dto_1 = require("../school/dto/school-filter.dto");
const school_service_1 = require("../school/services/school.service");
const school_board_dto_1 = require("../school/dto/school-board.dto");
const school_types_service_1 = require("../school-types/school-types.service");
const school_board_service_1 = require("../school/services/school-board.service");
const filter_school_type_dto_1 = require("../school-types/dto/filter-school-type.dto");
const school_classification_service_1 = require("../school-classification/school-classification.service");
const school_classification_filter_dto_1 = require("../school-classification/dto/school-classification-filter.dto");
const wallets_service_1 = require("../wallets/wallets.service");
const transactions_service_1 = require("../transactions/transactions.service");
const filter_transaction_dto_1 = require("../transactions/dto/filter-transaction.dto");
const filter_lead_dto_1 = require("../leads/dto/filter-lead.dto");
const leads_service_1 = require("../leads/leads.service");
let HomepageService = class HomepageService {
    constructor(schoolService, slugService, cityService, schoolBoardService, schoolTypeService, schoolClassificationService, walletsService, transactionsService, leadsService) {
        this.schoolService = schoolService;
        this.slugService = slugService;
        this.cityService = cityService;
        this.schoolBoardService = schoolBoardService;
        this.schoolTypeService = schoolTypeService;
        this.schoolClassificationService = schoolClassificationService;
        this.walletsService = walletsService;
        this.transactionsService = transactionsService;
        this.leadsService = leadsService;
    }
    async getFeaturedSchool(userId) {
        const schoolFilter = new school_filter_dto_1.SchoolFilterDto();
        schoolFilter.limit = 10;
        schoolFilter.isFeatured = true;
        schoolFilter.sortBy = { isFeatured: constants_1.SORTING_TYPE.DESC };
        if (userId)
            schoolFilter.userId = userId;
        return await this.schoolService.findAll(schoolFilter);
    }
    async websiteHomepage(userId) {
        const cityFilter = new city_filter_dto_1.CityFilterDto();
        cityFilter.isPopularCity = true;
        const popularCities = await this.cityService.findAll(cityFilter);
        const cityOrder = ['Delhi', 'Dehradun', 'Pune', 'Bengaluru', 'Shimla'];
        popularCities.data.sort((a, b) => {
            const indexA = cityOrder.indexOf(a.city);
            const indexB = cityOrder.indexOf(b.city);
            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
            }
            if (indexA === -1 && indexB === -1) {
                return 0;
            }
            return indexA === -1 ? 1 : -1;
        });
        const [featuredSchools, homePageSlugs] = await Promise.all([
            this.getFeaturedSchool(userId),
            this.slugService.repository.findAll({
                filter: {
                    $or: [
                        {
                            'filters.city': {
                                $in: popularCities.data.map((city) => city._id),
                            },
                        },
                        { isHomepageSlug: true },
                    ],
                },
            }),
        ]);
        return {
            homePageSlugs: homePageSlugs.data,
            popularCities: popularCities.data,
            featuredSchools: featuredSchools.schools,
        };
    }
    async adminPanelHomePage(user) {
        const [homePageCounts, featuredSchools] = await Promise.all([
            this.adminHomepageCounts(),
            this.getFeaturedSchool(),
        ]);
        if (user.role != constants_1.USER_ROLE.ADMIN) {
            delete homePageCounts.usersCount.admins;
            delete homePageCounts.usersCount.subAdmins;
        }
        return { ...homePageCounts, featuredSchools: featuredSchools.schools };
    }
    async schoolPanelHomePage(user) {
        const transactionsFilter = new filter_transaction_dto_1.TransactionFilter();
        transactionsFilter.user = user._id;
        transactionsFilter.limit = 10;
        const leadsFilter = new filter_lead_dto_1.LeadFilterDto();
        leadsFilter.owner = user._id;
        const [userWallet, transactions, myLeads] = await Promise.all([
            this.walletsService.myWallet(user._id),
            this.transactionsService.findAll(transactionsFilter),
            this.leadsService.findAll(user, leadsFilter)
        ]);
        return { wallet: userWallet, transactions, myLeads };
    }
    async schoolFilters() {
        const cityFilter = new city_filter_dto_1.CityFilterDto();
        const schoolBoardFilter = new school_board_dto_1.SchoolBoardFilterDto();
        schoolBoardFilter.featured = true;
        const schoolTypeFilter = new filter_school_type_dto_1.SchoolTypeFilterDto();
        const schoolClassificationFilter = new school_classification_filter_dto_1.SchoolClassificationFilterDto();
        const [cities, schoolBoards, schoolTypes, schoolClassifications] = await Promise.all([
            this.cityService.findAll(cityFilter),
            this.schoolBoardService.findAll(schoolBoardFilter),
            this.schoolTypeService.findAll(schoolTypeFilter),
            this.schoolClassificationService.findAll(schoolClassificationFilter),
        ]);
        return {
            cities: cities.data,
            schoolBoards: schoolBoards.data,
            schoolTypes: schoolTypes.data,
            schoolClassifications: schoolClassifications.data,
        };
    }
    async adminHomepageCounts() {
        const pipelines = [
            {
                $facet: {
                    schools: [
                        {
                            $count: 'totalSchools',
                        },
                    ],
                    users: [
                        {
                            $lookup: {
                                from: constants_1.USER_MODEL,
                                pipeline: [
                                    {
                                        $group: {
                                            _id: '$role',
                                            count: {
                                                $sum: 1,
                                            },
                                        },
                                    },
                                ],
                                as: 'users',
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                usersCount: {
                                    $first: '$users',
                                },
                            },
                        },
                    ],
                    cities: [
                        {
                            $lookup: {
                                from: constants_1.CITY_MODEL,
                                pipeline: [
                                    {
                                        $count: 'count',
                                    },
                                ],
                                as: 'count',
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalCities: { $first: { $first: '$count.count' } },
                            },
                        },
                    ],
                    ctaEnquiries: [
                        {
                            $lookup: {
                                from: constants_1.CTA_ENQUIRY_MODEL,
                                pipeline: [
                                    {
                                        $count: 'count',
                                    },
                                ],
                                as: 'count',
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                count: { $first: { $first: '$count.count' } },
                            },
                        },
                    ],
                },
            },
        ];
        const [{ users, schools, cities, ctaEnquiries }] = (await this.schoolService.repository.aggregate(pipelines));
        const usersCount = users[0]?.usersCount?.reduce((prev, curr) => {
            switch (curr._id) {
                case constants_1.USER_ROLE.ADMIN:
                    prev.admins += curr.count;
                    break;
                case constants_1.USER_ROLE.SUB_ADMIN:
                    prev.subAdmins += curr.count;
                    break;
                default:
                    prev.users += curr.count;
                    break;
            }
            return prev;
        }, { admins: 0, subAdmins: 0, users: 0 }) ?? { admins: 0, subAdmins: 0, users: 0 };
        let totalSchools = 0;
        let totalCities = 0;
        let totalCtaEnquiries = 0;
        if (schools != null && schools[0] != null) {
            totalSchools = schools[0]?.totalSchools ?? 0;
        }
        if (cities != null && cities[0] != null) {
            totalCities = cities[0]?.totalCities ?? 0;
        }
        if (ctaEnquiries != null && ctaEnquiries[0] != null) {
            totalCtaEnquiries = ctaEnquiries[0]?.count ?? 0;
        }
        return { totalSchools, usersCount, totalCities, totalCtaEnquiries };
    }
};
exports.HomepageService = HomepageService;
exports.HomepageService = HomepageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [school_service_1.SchoolService,
        slug_service_1.SlugService,
        city_service_1.CityService,
        school_board_service_1.SchoolBoardService,
        school_types_service_1.SchoolTypeService,
        school_classification_service_1.SchoolClassificationService,
        wallets_service_1.WalletsService,
        transactions_service_1.TransactionsService,
        leads_service_1.LeadsService])
], HomepageService);
//# sourceMappingURL=homepage.service.js.map