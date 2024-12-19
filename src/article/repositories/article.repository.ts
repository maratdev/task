import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleM } from '../model/article';
import { Articles } from '../entities/article.entity';
import { FindWithFiltersOptions, IArticleRepository } from './article.repository.interface';
import { ARTICLE } from '../constants';

@Injectable()
export class ArticleRepository implements IArticleRepository {
	constructor(
		@InjectRepository(Articles)
		private readonly articleEntityRepository: Repository<Articles>,
	) {}

	async update(id: string, { title }: Partial<ArticleM>): Promise<ArticleM> {
		const article = this.articleEntityRepository.update(
			{
				id: id,
			},
			{ title: title },
		);
		if (!article) throw new NotFoundException(ARTICLE.NOT_FOUND);
		return await this.findById(id);
	}

	async create(article: Partial<ArticleM>): Promise<ArticleM> {
		const articleEntity = this.toArticleEntity(article);
		const result = await this.articleEntityRepository.insert(articleEntity);
		return await this.findById(result.identifiers[0].id);
	}

	// сделать пагинацию
	async findAll(options: FindWithFiltersOptions): Promise<ArticleM[] | null> {
		const articleEntity = this.articleEntityRepository.createQueryBuilder('article');

		articleEntity.where('article.deleted_at IS NULL');
		if (options.search) {
			articleEntity.andWhere('article.title LIKE :search', { search: `%${options.search}%` });
		}
		articleEntity.orderBy('article.created_at ', 'DESC');
		if (options.limit) {
			articleEntity.take(options.limit);
		}
		if (options.offset) {
			articleEntity.skip(options.offset);
		}
		const articleEntities = await articleEntity.getMany();
		return articleEntities.map((articleEntity) => this.toArticle(articleEntity));
	}

	async findById(id: string): Promise<ArticleM | null> {
		const articleEntity = await this.articleEntityRepository.findOneOrFail({ where: { id } });
		if (!articleEntity) throw new NotFoundException(ARTICLE.NOT_FOUND);
		return this.toArticle(articleEntity);
	}

	async deleteById(id: string): Promise<boolean> {
		const deleteResult = await this.articleEntityRepository.softDelete({ id: id });
		return deleteResult.affected > 0;
	}

	private toArticle(todoEntity: Articles): ArticleM {
		const article: ArticleM = new ArticleM();

		article.id = todoEntity.id;
		article.title = todoEntity.title;
		article.createdAt = todoEntity.createdAt;
		article.updatedAt = todoEntity.updatedAt;
		article.deletedAt = todoEntity.deletedAt;

		return article;
	}

	private toArticleEntity(todo: Partial<ArticleM>): Articles {
		const articleEntity: Articles = new Articles();
		articleEntity.id = todo.id;
		articleEntity.title = todo.title;
		return articleEntity;
	}
}
