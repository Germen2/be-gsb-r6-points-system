import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { ObjectiveStatus } from './enums';

export type ObjectiveDocument = HydratedDocument<Objective>;

@Schema()
export class Objective {
  @ApiProperty({ example: new Types.ObjectId() })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Top Fragger' })
  @Prop()
  description: string;

  @ApiProperty({ example: 6 })
  @Prop()
  value: number;

  @ApiProperty({ example: ObjectiveStatus.active })
  @Prop({ default: ObjectiveStatus.active })
  status: ObjectiveStatus;

  //   @ApiProperty({ example: ['JOSOUUU', 'Germen'] })
  //   @Prop({ default: [], type: () => [String] })
  //   exclusive?: string[];
}

export const ObjectiveSchema = SchemaFactory.createForClass(Objective);
