import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ example: new Types.ObjectId() })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'myemail@gmail.com' })
  @Prop()
  username: string;

  @ApiProperty({ example: 'Joso' })
  @Prop()
  firstName: string;

  @ApiProperty({ example: 'Alfaro' })
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop()
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
