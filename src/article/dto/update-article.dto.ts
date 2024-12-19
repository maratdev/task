import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
	@IsOptional()
	@IsString({ message: 'Title must be a string' })
	@IsNotEmpty()
	title?: string;
}
