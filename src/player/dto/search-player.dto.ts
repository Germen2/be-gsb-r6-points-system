import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from '@nestjs/class-validator';
import { PlayerStatus } from '../../models/enums';

export class SearchPlayerDto {
  @ApiProperty({ example: 'JOSOUU' })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ example: 'Joso' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: PlayerStatus.active })
  @IsString()
  @IsOptional()
  status: PlayerStatus;

  @ApiProperty({ example: 4 })
  @IsString()
  @IsOptional()
  points: number;
}
