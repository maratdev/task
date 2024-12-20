import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from './logger.interface';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const configService = new ConfigService();
@Injectable()
export class LoggerService extends Logger implements ILogger {
	debug(context: string, message: string) {
		if (configService.get<string>('NODE_ENV') === 'development') {
			super.debug(`[DEBUG] ${message}`, context);
		}
	}
	log(context: string, message: string) {
		super.log(`[INFO] ${message}`, context);
	}
	error(context: string, message: string, trace?: string) {
		super.error(`[ERROR] ${message}`, trace, context);
	}
	warn(context: string, message: string) {
		super.warn(`[WARN] ${message}`, context);
	}
	verbose(context: string, message: string) {
		if (configService.get<string>('NODE_ENV') === 'development') {
			super.verbose(`[VERBOSE] ${message}`, context);
		}
	}
}
