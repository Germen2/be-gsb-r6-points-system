import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { RewardStatus } from '../../models/enums';

export class UpdateRewardDto {
  @ApiProperty({ example: 'Escoger ban' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: RewardStatus.active })
  @IsString()
  @IsOptional()
  status: RewardStatus;
}
