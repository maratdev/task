import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Order } from '../repositories/article.repository.interface';

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
	@IsEnum(Order)
	order?: Order;

	@IsOptional()
	@IsString()
	search?: string;
}
