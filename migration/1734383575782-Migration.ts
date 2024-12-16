import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1734383575782 implements MigrationInterface {
	name = 'Migration1734383575782';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "articles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "created_at" TIMESTAMP(6) NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(6) DEFAULT now(), "deleted_at" TIMESTAMP(6), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "articles"`);
	}
}
