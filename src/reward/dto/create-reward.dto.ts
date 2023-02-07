import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRewardDto {
  @ApiProperty({ example: 'Escoger ban' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;
}
