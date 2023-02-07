import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';
import { RewardStatus } from './enums';

export type RewardDocument = HydratedDocument<Reward>;

@Schema()
export class Reward {
  @ApiProperty({ example: new Types.ObjectId() })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'Escoger Ban' })
  @Prop()
  description: string;

  @ApiProperty({ example: 10 })
  @Prop()
  price: number;

  @ApiProperty({ example: RewardStatus.inactive })
  @Prop({ default: RewardStatus.active })
  status: RewardStatus;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
