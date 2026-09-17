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
