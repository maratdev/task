import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleM } from './model/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticlesQueryDto } from './dto/query-articles.dto';
import { validate } from 'class-validator';
import { ARTICLE } from './constants';

@UsePipes(new ValidationPipe())
@Controller('articles')
export class ArticlesController {
	constructor(private readonly articleService: ArticleService) {}

	@Get() // /article?limit=100&offset=5&order=DESC&search=NestJS
	async getAllArticles(@Query() query: GetArticlesQueryDto): Promise<ArticleM[]> {
		const errors = await validate(query);
		if (errors.length > 0) {
			throw new BadRequestException(`${ARTICLE.BAD_REQUEST}: ${errors}`);
		}
		return this.articleService.getAllArticles(query);
	}

	@Get(':id')
	async getArticleById(@Param('id', ParseUUIDPipe) id: string): Promise<ArticleM | null> {
		return this.articleService.getArticleById(id);
	}

	@Post()
	async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<ArticleM> {
		return this.articleService.createArticle(createArticleDto);
	}

	@Put(':id')
	async updateArticle(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateArticleDto: UpdateArticleDto,
	): Promise<ArticleM | null> {
		return this.articleService.updateArticle(id, updateArticleDto);
	}

	@Delete(':id')
	async deleteArticle(@Param('id', ParseUUIDPipe) id: string): Promise<Pick<ArticleM, 'id'>> {
		return this.articleService.deleteArticle(id);
	}
}
