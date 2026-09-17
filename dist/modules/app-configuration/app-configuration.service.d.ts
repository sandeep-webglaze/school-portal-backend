import { IAppConfig } from './interface';
import { AppConfigurationRepository } from './app-configuration.repository';
export declare class AppConfigurationService {
    private readonly repository;
    constructor(repository: AppConfigurationRepository);
    findOne(): Promise<import("mongoose").Document<unknown, {}, import("./interface").IAppConfigDocument> & IAppConfig & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(body: IAppConfig): Promise<import("../../lib/repository").UpdatedModel>;
}
