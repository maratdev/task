import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { STATUS } from './config/constants/default';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('DEFAULT_PORT') || STATUS.DEFAULT_PORT;
	Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
