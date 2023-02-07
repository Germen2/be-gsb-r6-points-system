import { IsNotEmpty, IsNumber, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 'JOSOUUU' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Joso' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsNumber()
  points: number;
}
