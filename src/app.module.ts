import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { ConfigAppModule } from './config/core/config-app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ArticleModule,
		ConfigAppModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useClass: TypeOrmConfigService,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
