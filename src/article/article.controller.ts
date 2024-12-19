import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleM } from './model/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticlesQueryDto } from './dto/query-articles.dto';
import { validate } from 'class-validator';
import { ARTICLE } from './constants';

@Controller('articles')
export class ArticlesController {
	constructor(private readonly articleService: ArticleService) {}

	@Get()
	async getAllArticles(@Query() query: GetArticlesQueryDto): Promise<ArticleM[]> {
		const errors = await validate(query);
		if (errors.length > 0) {
			throw new BadRequestException(`${ARTICLE.BAD_REQUEST}: ${errors}`);
		}
		return this.articleService.getAllArticles(query);
	}

	@Get(':id')
	async getArticleById(@Param('id') id: string): Promise<ArticleM | null> {
		return this.articleService.getArticleById(id);
	}

	@Post()
	async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<ArticleM> {
		return this.articleService.createArticle(createArticleDto);
	}

	@Put(':id')
	async updateArticle(
		@Param('id') id: string,
		@Body() updateArticleDto: UpdateArticleDto,
	): Promise<ArticleM | null> {
		return this.articleService.updateArticle(id, updateArticleDto);
	}

	@Delete(':id')
	async deleteArticle(@Param('id') id: string): Promise<void> {
		return this.articleService.deleteArticle(id);
	}
}
