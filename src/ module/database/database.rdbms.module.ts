import { Module } from '@nestjs/common';
import { DatabaseProviders } from '../../database/database.providers';
import { Connection } from '../../database/connection.provider';

@Module({
  providers: [Connection],
  exports: [Connection],
})
export class DatabaseModule {
  private static forRoot(
    entities = [],
    options?: any,
  ): {
    exports: DatabaseProviders;
    module: DatabaseModule;
    providers: DatabaseProviders;
  } {
    const providers = new DatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
