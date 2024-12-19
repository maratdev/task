import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleM } from './model/article';
import { GetArticlesQueryDto } from './dto/query-articles.dto';

@Injectable()
export class ArticleService {
	constructor(private readonly articleRepository: ArticleRepository) {}

	async getAllArticles(query: GetArticlesQueryDto): Promise<ArticleM[]> {
		const { limit, offset, search } = query;
		return this.articleRepository.findAll({
			limit,
			offset,
			search,
		});
	}

	async getArticleById(id: string): Promise<ArticleM | null> {
		return this.articleRepository.findById(id);
	}

	async createArticle(data: Partial<ArticleM>): Promise<ArticleM> {
		return this.articleRepository.create(data);
	}

	async updateArticle(id: string, data: Partial<ArticleM>): Promise<ArticleM | null> {
		return this.articleRepository.update(id, data);
	}

	async deleteArticle(id: string): Promise<void> {
		await this.articleRepository.deleteById(id);
	}
}
