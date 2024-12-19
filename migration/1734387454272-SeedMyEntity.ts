import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker/locale/ru';
import { Logger } from '@nestjs/common';

export class SeedMyEntity1734387454272 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const recordsToInsert = 500;
		const values = [];

		for (let i = 0; i < recordsToInsert; i++) {
			const deletedAt = Math.random() > 0.5 ? faker.date.recent() : null;

			values.push({
				title: faker.lorem.words(3), // Генерация случайного title (3 слова)
				created_at: faker.date.past(), // Случайная дата в прошлом
				updated_at: faker.date.recent(), // Недавняя дата для updated_at
				deleted_at: deletedAt,
			});
		}
		const insertQuery = `
      INSERT INTO articles (title, created_at, updated_at, deleted_at)
      VALUES
        ${values
					.map(
						(article) =>
							`(
                '${article.title}',
                '${article.created_at.toISOString()}',
                '${article.updated_at.toISOString()}',
                ${article.deleted_at ? `'${article.deleted_at.toISOString()}'` : 'NULL'}
              )`,
					)
					.join(',\n')};
    `;

		await queryRunner.query(insertQuery);
		Logger.log('Fake article with random deleted_at have been inserted');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      DELETE FROM articles WHERE title LIKE 'Article%';
    `);
		Logger.log('Fake article have been deleted');
	}
}
