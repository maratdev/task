import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { STATUS } from './config/constants/default';
import { LoggerService } from './config/logger/logger.service';
import { AllExceptionFilter } from './config/filter/exception.filter';
import { LoggingInterceptor } from './config/interceptors/logger.interceptor';
import { ResponseInterceptor } from './config/interceptors/response.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	// Filter
	app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
	// interceptors
	app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
	app.useGlobalInterceptors(new ResponseInterceptor());
	const port = configService.get<number>('DEFAULT_PORT') || STATUS.DEFAULT_PORT;
	await app.listen(port);
	Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
