/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { IUserObj } from '../user/interface';
import { HomepageService } from './homepage.service';
import { AuthService } from '../auth/auth.service';
export declare class HomepageController {
    private readonly homepageService;
    private readonly authService;
    constructor(homepageService: HomepageService, authService: AuthService);
    website(authHeader: any): Promise<{
        homePageSlugs: import("../slug/interface").ISlugDocument[];
        popularCities: import("../city/interface").ICityDocument[];
        featuredSchools: import("../school/interface").ISchoolDocument[];
    }>;
    adminPanel(user: IUserObj): Promise<{
        featuredSchools: import("../school/interface").ISchoolDocument[];
        totalSchools: number;
        usersCount: {
            admins: number;
            subAdmins: number;
            users: number;
        };
        totalCities: number;
        totalCtaEnquiries: number;
    }>;
    schoolPanel(user: IUserObj): Promise<{
        wallet: import("mongoose").Document<unknown, {}, import("../wallets/interface").IWalletDocument> & import("../wallets/interface").IWallet & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
        transactions: {
            data: import("../transactions/interface").ITransactionDocument[];
            totalCount: number;
        };
        myLeads: {
            data: import("../leads/interface").ILeadDocument[];
            totalCount: number;
        };
    }>;
    schoolFilters(): Promise<{
        cities: import("../city/interface").ICityDocument[];
        schoolBoards: import("../school/interface").ISchoolBoardDocument[];
        schoolTypes: import("../school-types/interface").ISchoolTypeDocument[];
        schoolClassifications: import("../school-classification/interface").ISchoolClassificationDocument[];
    }>;
}
