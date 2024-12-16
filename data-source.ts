import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const configService = new ConfigService();
const AppDataSource = new DataSource({
	type: 'postgres',
	host: configService.get<string>('PG_HOST'),
	port: configService.get<number>('PG_PORT'),
	username: configService.get<string>('PG_USER'),
	password: configService.get<string>('PG_PASSWORD'),
	database: configService.get<string>('PG_DATABASE'),
	synchronize: configService.get<string>('NODE_ENV') === 'development',
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migration/*.js'],
	logging: true,
});
export default AppDataSource;
