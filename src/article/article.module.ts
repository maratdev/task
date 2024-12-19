import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticlesController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from './entities/article.entity';
import { ArticleRepository } from './repositories/article.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Articles])],
	controllers: [ArticlesController],
	providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
