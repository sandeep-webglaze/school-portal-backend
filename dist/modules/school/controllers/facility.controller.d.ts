import { FacilityService } from '../services/facility.service';
import { CreateFacilityDto, FacilityFilterDto, UpdateFacilityDto } from '../dto/facility.dto';
export declare class FacilityController {
    private readonly facilityService;
    constructor(facilityService: FacilityService);
    create(body: CreateFacilityDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").IFacilityDocument>>;
    findAll(filter: FacilityFilterDto): Promise<{
        data: import("../interface").IFacilityDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("../interface").IFacilityDocument>;
    update(id: string, updateSchoolDto: UpdateFacilityDto): Promise<import("../../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").IFacilityDocument> & import("../interface").IFacility & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
