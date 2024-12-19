import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
	@IsString({ message: 'Title must be a string' })
	@IsNotEmpty()
	title: string;
}
