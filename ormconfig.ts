import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export const dbConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'salt.id4321',
    database: 'nest_test',
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['dist/migration/**{.ts,.js}'],
    migrationsRun: true,
    migrationsTableName: 'migrations_type_orm',
    synchronize: false,
    logging: true
}
