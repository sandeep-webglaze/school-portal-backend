import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ValidateMongoId implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): string;
}
