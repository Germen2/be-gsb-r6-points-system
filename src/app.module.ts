import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { AuthModule } from './auth/auth.module';
import { RewardModule } from './reward/reward.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ObjectiveModule } from './objective/objective.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    PlayerModule,
    AuthModule,
    RewardModule,
    ObjectiveModule,
  ],
})
export class AppModule {}
