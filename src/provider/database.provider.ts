import { Module } from '@nestjs/common';

@Module({})
export class DatabaseProvider {
  get entities(): any[] {
    return this._entities;
  }

  set entities(value: any[]) {
    this._entities = value;
  }
  private options: any;
  private _entities: any[];
  constructor(options: any, entities: any[]) {
    this._entities = entities;
    this.options = options;
  }
}
