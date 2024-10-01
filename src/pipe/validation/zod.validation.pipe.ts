import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  get metadata(): ArgumentMetadata {
    return this._metadata;
  }

  set metadata(value: ArgumentMetadata) {
    this._metadata = value;
  }
  private _metadata: ArgumentMetadata;
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    this._metadata = metadata;
    try {
      return this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
