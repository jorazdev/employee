import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from 'src/entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mysql', // Docker : "mysql" localhost
  port:  3306,
  username: 'emp', // emp
  password: 'emp',
  database: 'emp',
  entities: entities,
  synchronize: true, // ⚠️ à désactiver en production
  retryAttempts: 10,  // Nombre de tentatives si la connexion échoue
  retryDelay: 3000,   // Attente entre les tentatives (ms)
};
