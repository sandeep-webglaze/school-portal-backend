import { PipelineStage } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { CITY_MODEL, CTA_ENQUIRY_MODEL, SORTING_TYPE, USER_MODEL, USER_ROLE } from '@/src/lib/constants';
import { IUserObj } from '../user/interface';
import { CityService } from '../city/city.service';
import { SlugService } from '../slug/slug.service';
import { CityFilterDto } from '../city/dto/city-filter.dto';
import { SchoolFilterDto } from '../school/dto/school-filter.dto';
import { SchoolService } from '../school/services/school.service';
import { SchoolBoardFilterDto } from '../school/dto/school-board.dto';
import { SchoolTypeService } from '../school-types/school-types.service';
import { SchoolBoardService } from '../school/services/school-board.service';
import { SchoolTypeFilterDto } from '../school-types/dto/filter-school-type.dto';
import { SchoolClassificationService } from '../school-classification/school-classification.service';
import { SchoolClassificationFilterDto } from '../school-classification/dto/school-classification-filter.dto';
import { WalletsService } from '../wallets/wallets.service';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionFilter } from '../transactions/dto/filter-transaction.dto';
import { LeadFilterDto } from '../leads/dto/filter-lead.dto';
import { LeadsService } from '../leads/leads.service';

@Injectable()
export class HomepageService {
  constructor(
    readonly schoolService: SchoolService,
    readonly slugService: SlugService,
    readonly cityService: CityService,
    readonly schoolBoardService: SchoolBoardService,
    readonly schoolTypeService: SchoolTypeService,
    readonly schoolClassificationService: SchoolClassificationService,
    readonly walletsService: WalletsService,
    readonly transactionsService: TransactionsService,
    readonly leadsService: LeadsService,
  ) { }

  private async getFeaturedSchool(userId?: string) {
    const schoolFilter = new SchoolFilterDto();
    schoolFilter.limit = 10;
    schoolFilter.isFeatured = true;
    schoolFilter.sortBy = { isFeatured: SORTING_TYPE.DESC };
    if (userId) schoolFilter.userId = userId;

    return await this.schoolService.findAll(schoolFilter);
  }

  async websiteHomepage(userId?: string) {
    const cityFilter = new CityFilterDto();
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
  
  

  async adminPanelHomePage(user: IUserObj) {
    const [homePageCounts, featuredSchools] = await Promise.all([
      this.adminHomepageCounts(),
      this.getFeaturedSchool(),
    ]);

    if (user.role != USER_ROLE.ADMIN) {
      delete homePageCounts.usersCount.admins;
      delete homePageCounts.usersCount.subAdmins;
    }

    return { ...homePageCounts, featuredSchools: featuredSchools.schools };
  }

  async schoolPanelHomePage(user: IUserObj) {
    const transactionsFilter = new TransactionFilter()
    transactionsFilter.user = user._id;
    transactionsFilter.limit = 10;

    const leadsFilter = new LeadFilterDto()
    leadsFilter.owner = user._id;

    const [userWallet, transactions, myLeads] = await Promise.all([
      this.walletsService.myWallet(user._id),
      this.transactionsService.findAll(transactionsFilter),
      this.leadsService.findAll(user, leadsFilter)
    ]);

    return { wallet: userWallet, transactions, myLeads }
  }

  async schoolFilters() {
    const cityFilter = new CityFilterDto();
    const schoolBoardFilter = new SchoolBoardFilterDto();
    schoolBoardFilter.featured = true;
    const schoolTypeFilter = new SchoolTypeFilterDto();
    const schoolClassificationFilter = new SchoolClassificationFilterDto();

    const [cities, schoolBoards, schoolTypes, schoolClassifications] =
      await Promise.all([
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

  private async adminHomepageCounts() {
    const pipelines: PipelineStage[] = [
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
                from: USER_MODEL,
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
                from: CITY_MODEL,
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
                from: CTA_ENQUIRY_MODEL,
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

    const [{ users, schools, cities, ctaEnquiries }] =
      (await this.schoolService.repository.aggregate(pipelines)) as [
        {
          users: [{ usersCount: { _id: USER_ROLE; count: number }[] }];
          schools: [{ totalSchools: number }];
          cities: [{ totalCities: number }];
          ctaEnquiries: [{ count: number }];
        },
      ];

    const usersCount = users[0]?.usersCount?.reduce(
      (prev, curr) => {
        switch (curr._id) {
          case USER_ROLE.ADMIN:
            prev.admins += curr.count;
            break;
          case USER_ROLE.SUB_ADMIN:
            prev.subAdmins += curr.count
            break;
          default:
            prev.users += curr.count;
            break;
        }
        return prev;
      },
      { admins: 0, subAdmins: 0, users: 0 },
    ) ?? { admins: 0, subAdmins: 0, users: 0 };

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
}
