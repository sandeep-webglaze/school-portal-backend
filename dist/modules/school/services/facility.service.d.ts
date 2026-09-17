import { UploadService } from '../../upload/upload.service';
import { CreateFacilityDto, FacilityFilterDto, UpdateFacilityDto } from '../dto/facility.dto';
import { FacilityRepository } from '../repositories/facility.repository';
export declare class FacilityService {
    readonly repository: FacilityRepository;
    readonly uploadService: UploadService;
    constructor(repository: FacilityRepository, uploadService: UploadService);
    create(createFacilityDto: CreateFacilityDto): Promise<import("../../../lib/repository").CreatedModel<import("../interface").IFacilityDocument>>;
    findAll(filterDto: FacilityFilterDto): Promise<{
        data: import("../interface").IFacilityDocument[];
        totalCount: number;
    }>;
    findOne(id: string): Promise<import("../interface").IFacilityDocument>;
    update(id: string, updateFacilityDto: UpdateFacilityDto): Promise<import("../../../lib/repository").UpdatedModel>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../interface").IFacilityDocument> & import("../interface").IFacility & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
