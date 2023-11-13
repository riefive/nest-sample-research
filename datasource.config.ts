import { DataSource } from 'typeorm'

export const datasource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'salt.id4321',
    database: 'nest_test',
    entities: ['src/**/**.entity{.ts}'],
    migrations: ['dist/migration/**{.ts,.js}'],
    migrationsTableName: 'migrations_type_orm',
});

export default datasource;