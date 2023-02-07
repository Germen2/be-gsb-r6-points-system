import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdatePlayerPointsDto {
  @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
