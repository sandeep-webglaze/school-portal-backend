import { AppConfigurationService } from './app-configuration.service';
import { CreateAppConfigurationDto } from './dto/create-app-configuration.dto';
export declare class AppConfigurationController {
    private readonly appConfigurationsService;
    constructor(appConfigurationsService: AppConfigurationService);
    findOne(): Promise<import("mongoose").Document<unknown, {}, import("./interface").IAppConfigDocument> & import("./interface").IAppConfig & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(body: CreateAppConfigurationDto): Promise<import("../../lib/repository").UpdatedModel>;
}
