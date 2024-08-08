import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

// Configurações do banco de dados para conexão com o Postgres usando TypeORM e variáveis de ambiente do arquivo .env
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + 'src/config/migrations/*.{js,ts}'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
