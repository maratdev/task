import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { ArticleM } from '../model/article';
import { Articles } from '../entities/article.entity';
import { FindWithFiltersOptions, IArticleRepository, Order } from './article.repository.interface';
import { ARTICLE, DB } from '../constants';

@Injectable()
export class ArticleRepository implements IArticleRepository {
	constructor(
		@InjectRepository(Articles)
		private readonly articleEntityRepository: Repository<Articles>,
	) {}

	async update(id: string, { title }: Partial<ArticleM>): Promise<ArticleM> {
		try {
			await this.articleEntityRepository.findOneOrFail({ where: { id } });
			await this.articleEntityRepository.update(
				{
					id: id,
				},
				{ title: title },
			);
			return await this.findById(id);
		} catch (e) {
			this.handleDatabaseError(e);
		}
	}

	async create(article: Partial<ArticleM>): Promise<ArticleM> {
		try {
			const articleEntity = this.toArticleEntity(article);
			const result = await this.articleEntityRepository.insert(articleEntity);
			return await this.findById(result.identifiers[0].id);
		} catch (e) {
			this.handleDatabaseError(e);
		}
	}

	// сделать пагинацию
	async findAll(options: FindWithFiltersOptions): Promise<ArticleM[] | null> {
		try {
			// Условие для учета только "неудаленных" записей
			const articleEntity = this.articleEntityRepository.createQueryBuilder(DB.NAME);
			articleEntity.where(`${DB.NAME}.deleted_at IS NULL`);
			// Фильтрация по строке поиска
			if (options.search) {
				const sanitizedSearch = `%${options.search.trim().toLowerCase()}%`;
				articleEntity.andWhere(`LOWER(${DB.NAME}.title) LIKE LOWER(:search)`, {
					search: sanitizedSearch,
				});
			}
			// Сортировка
			const order =
				options.order === Order.ASC || options.order === Order.DESC ? options.order : Order.DESC;
			articleEntity.orderBy(`${DB.NAME}.created_at`, order);
			// Лимит и смещение
			const limit = options.limit && options.limit > 0 ? options.limit : DB.LIMIT;
			articleEntity.take(limit);

			if (options.offset) {
				articleEntity.skip(options.offset);
			}

			// Добавление вычисляемого столбца "difference"
			articleEntity.addSelect(
				`ABS(DATE_PART('day', ${DB.NAME}.updated_at - ${DB.NAME}.created_at))`,
				'difference',
			);
			const articleEntities = await articleEntity.getRawMany();
			return articleEntities.map((entity) => ({
				...this.toArticle(entity),
				difference: parseInt(entity.difference, 10),
			}));
		} catch (e) {
			this.handleDatabaseError(e);
		}
	}

	async findById(id: string): Promise<ArticleM | null> {
		try {
			const articleEntity = await this.articleEntityRepository.findOneOrFail({
				where: { id },
				withDeleted: true, // Учитываем записи, помеченные как удалённые
			});
			return this.toArticle(articleEntity);
		} catch (e) {
			this.handleDatabaseError(e);
		}
	}

	async deleteById(id: string): Promise<Pick<ArticleM, 'id'>> {
		try {
			const article = await this.articleEntityRepository.findOneOrFail({ where: { id: id } });
			const deleteResult = await this.articleEntityRepository.softDelete({ id: id });
			if (deleteResult.affected > 0) {
				return { id: article.id };
			}
		} catch (e) {
			this.handleDatabaseError(e);
		}
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

	private handleDatabaseError(error: any): void {
		if (error instanceof QueryFailedError) {
			throw new BadRequestException(error.message);
		}

		if (error instanceof EntityNotFoundError) {
			throw new NotFoundException(ARTICLE.NOT_FOUND);
		}
	}
}
