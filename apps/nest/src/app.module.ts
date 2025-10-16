import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { HelloModule } from './hello/hello.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { EmployeeModule } from './employee/employee.module';
import { AbsenceModule } from './absence/absence.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // rend la config accessible partout sans devoir la réimporter
      envFilePath: join(__dirname, '.env')
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      csrfPrevention: false,
      driver: ApolloDriver,
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    HelloModule,
    EmployeeModule,
    AbsenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
