import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const configService = new ConfigService();
export const ARTICLE = {
	NOT_FOUND: 'Article not found',
	CONFLICT: 'Article conflict title',
	FAILED_DELETE: 'Failed to delete article with id: ',
	BAD_REQUEST: 'Article already exists',
};

export const DB = {
	NAME: configService.get<string>('PG_TABLES'),
	LIMIT: 10,
};
