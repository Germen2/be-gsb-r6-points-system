import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { PlayerStatus } from './enums';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @ApiProperty({ example: new Types.ObjectId() })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'JOSOUUU' })
  @Prop()
  username: string;

  @ApiProperty({ example: 'Joso' })
  @Prop()
  name: string;

  @ApiProperty({ example: 7 })
  @Prop({ default: 0 })
  points: number;

  @ApiProperty({ example: PlayerStatus.active })
  @Prop({ default: PlayerStatus.inactive })
  status: PlayerStatus;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
