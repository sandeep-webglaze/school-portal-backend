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
