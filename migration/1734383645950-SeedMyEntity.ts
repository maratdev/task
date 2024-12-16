import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker/locale/ru';

export class SeedMyEntity1734383645950 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const recordsToInsert = 500; // Количество записей
		const values = [];

		for (let i = 0; i < recordsToInsert; i++) {
			values.push(`('${faker.string.uuid()}', '${faker.lorem.words(3)}', NOW(), NULL, NULL)`);
		}

		await queryRunner.query(`
      INSERT INTO articles (id, title, created_at, updated_at, deleted_at)
      VALUES ${values.join(', ')}
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM articles');
	}
}
