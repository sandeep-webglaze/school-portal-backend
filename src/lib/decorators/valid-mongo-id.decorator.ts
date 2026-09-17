import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isObjectIdOrHexString } from "mongoose";

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): string { // Optional casting into ObjectId if wanted!
        if (isObjectIdOrHexString(value)) {
            return value;
        }
        throw new BadRequestException('Invalid MongoId')
    };
}
