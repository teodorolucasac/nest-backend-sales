import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTableUser1680700537567 } from './migration/1680700537567-create_table_user';
import { createTableState1680704808919 } from './migration/1680704808919-create_table_state';
import { createTableCity1680704816860 } from './migration/1680704816860-create_table_city';
import { createTableAddress1680704823670 } from './migration/1680704823670-create_table_address';
import { alterTableState1680713117417 } from './migration/1680713117417-alter-table-state';
import { insertInState1680713137762 } from './migration/1680713137762-insert-in-state';
import { insertInCity1680713149230 } from './migration/1680713149230-insert-in-city';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      // entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      // migrations: [`${__dirname}/migration/{.ts,*.js}`],
      synchronize: true,
      autoLoadEntities: true,
      migrations: [
        createTableUser1680700537567,
        createTableState1680704808919,
        createTableCity1680704816860,
        createTableAddress1680704823670,
        alterTableState1680713117417,
        insertInState1680713137762,
        insertInCity1680713149230,
      ],
      migrationsRun: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
