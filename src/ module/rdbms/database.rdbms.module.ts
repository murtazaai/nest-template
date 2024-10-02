import { Module } from '@nestjs/common';
import { DatabaseProvider } from '../../provider/database.provider';
import { Connection } from '../../provider/database/connection.database.provider';

@Module({
  providers: [Connection],
  exports: [Connection],
})
export class DatabaseModule {
  private static forRoot(
    entities = [],
    options?: any,
  ): {
    exports: DatabaseProvider;
    module: DatabaseModule;
    providers: DatabaseProvider;
  } {
    const providers = new DatabaseProvider(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
