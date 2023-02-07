import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ObjectiveStatus } from '../../models/enums';

export class UpdateObjectiveDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Type(() => Number)
  value: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: ObjectiveStatus;
}
