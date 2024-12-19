import { ArticleM } from '../model/article';

export interface IArticleRepository {
	create(article: ArticleM): Promise<ArticleM>;

	findAll(options: FindWithFiltersOptions): Promise<ArticleM[] | null>;

	findById(id: string): Promise<ArticleM | null>;

	update(id: string, title: Partial<ArticleM>): Promise<ArticleM>;

	deleteById(id: string): Promise<boolean>;
}

export interface FindWithFiltersOptions {
	limit?: number;
	offset?: number;
	search?: string;
}
