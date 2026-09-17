import { ISchool } from '../interface';
export declare class CreateSchoolDto implements ISchool {
    name: string;
    chairman: string;
    establishmentYear: number;
    medium: string;
    classification: string;
    city: string;
    minFees: number;
    maxFees: number;
    admissionStart: string;
    admissionEnd: string;
    classFrom: string;
    classTo: string;
    contactNumber: string;
    mail: string;
    website: string;
    about: string;
    avgRating: number;
    avgAcademicsRating: number;
    avgInfrastructureRating: number;
    avgAddmissionRating: number;
    avgExtracurriclarRating: number;
    images: string[];
    type: string[];
    schoolBoards: string[];
    facilities: string[];
    isFeatured: boolean;
    featuredPriority: number;
    published: boolean;
    slug: string;
}
declare const UpdateSchoolDto_base: import("@nestjs/common").Type<Partial<CreateSchoolDto>>;
export declare class UpdateSchoolDto extends UpdateSchoolDto_base {
    removeImageUrls?: string[];
}
export declare class FeaturedSchoolPriorityDto {
    schoolId: string;
    priority: number;
}
export declare class UpdateFeaturedSchoolsPriorityDto {
    priorities: FeaturedSchoolPriorityDto[];
}
export {};
