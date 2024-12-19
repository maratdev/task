import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetArticlesQueryDto {
	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => parseInt(value, 10))
	limit?: number;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => parseInt(value, 10))
	offset?: number;

	@IsOptional()
	@IsString()
	search?: string;
}
