import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ database: 'articles' })
export class Articles {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	title: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 6 })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 6, nullable: true })
	updatedAt?: Date;

	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', precision: 6, nullable: true })
	deletedAt?: Date;
}
