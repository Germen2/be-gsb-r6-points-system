import { Module } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveController } from './objective.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectiveSchema } from '../models/objective.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Objective', schema: ObjectiveSchema }]),
    AuthModule,
  ],
  providers: [ObjectiveService],
  controllers: [ObjectiveController],
})
export class ObjectiveModule {}
