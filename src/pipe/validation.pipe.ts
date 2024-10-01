import { PipeTransform, Injectable } from '@nestjs/common';
import Type = module;
import * as module from 'node:module';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private metadata: ArgumentMetadata;
  transform(value: any, metadata: ArgumentMetadata) {
    this.metadata = metadata;
    return value;
  }
}

export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  // @ts-ignore
  metatype?: Type<unknown>;
  data?: string;
}
