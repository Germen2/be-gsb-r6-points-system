import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardSchema } from '../models';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reward', schema: RewardSchema }]),
    AuthModule,
  ],
  providers: [RewardService],
  controllers: [RewardController],
})
export class RewardModule {}
