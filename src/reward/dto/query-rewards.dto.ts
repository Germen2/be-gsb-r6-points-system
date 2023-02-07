import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class QueryRewardsDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;
}
