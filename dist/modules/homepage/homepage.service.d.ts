import { IUserObj } from '../user/interface';
import { CityService } from '../city/city.service';
import { SlugService } from '../slug/slug.service';
import { SchoolService } from '../school/services/school.service';
import { SchoolTypeService } from '../school-types/school-types.service';
import { SchoolBoardService } from '../school/services/school-board.service';
import { SchoolClassificationService } from '../school-classification/school-classification.service';
import { WalletsService } from '../wallets/wallets.service';
import { TransactionsService } from '../transactions/transactions.service';
import { LeadsService } from '../leads/leads.service';
export declare class HomepageService {
    readonly schoolService: SchoolService;
    readonly slugService: SlugService;
    readonly cityService: CityService;
    readonly schoolBoardService: SchoolBoardService;
    readonly schoolTypeService: SchoolTypeService;
    readonly schoolClassificationService: SchoolClassificationService;
    readonly walletsService: WalletsService;
    readonly transactionsService: TransactionsService;
    readonly leadsService: LeadsService;
    constructor(schoolService: SchoolService, slugService: SlugService, cityService: CityService, schoolBoardService: SchoolBoardService, schoolTypeService: SchoolTypeService, schoolClassificationService: SchoolClassificationService, walletsService: WalletsService, transactionsService: TransactionsService, leadsService: LeadsService);
    private getFeaturedSchool;
    websiteHomepage(userId?: string): Promise<{
        homePageSlugs: import("../slug/interface").ISlugDocument[];
        popularCities: import("../city/interface").ICityDocument[];
        featuredSchools: import("../school/interface").ISchoolDocument[];
    }>;
    adminPanelHomePage(user: IUserObj): Promise<{
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
    schoolPanelHomePage(user: IUserObj): Promise<{
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
    private adminHomepageCounts;
}
