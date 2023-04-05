import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTableUser1680700537567 } from './migration/1680700537567-create_table_user';
import { createTableState1680704808919 } from './migration/1680704808919-create_table_state';
import { createTableCity1680704816860 } from './migration/1680704816860-create_table_city';
import { createTableAddress1680704823670 } from './migration/1680704823670-create_table_address';

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
      // synchronize: true,
      // autoLoadEntities: true,
      entities: [`${__dirname}/**/*.entity.js`],
      migrations: [
        createTableUser1680700537567,
        createTableState1680704808919,
        createTableCity1680704816860,
        createTableAddress1680704823670,
      ],
      migrationsRun: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
