import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from '../models';
import { CreateRewardDto, UpdateRewardDto } from './dto';

@Injectable()
export class RewardService {
  constructor(@InjectModel('Reward') private rewardModel: Model<Reward>) {}

  /**
   * @returns array of rewards
   */
  async getRewards(): Promise<Reward[]> {
    const rewards: Reward[] = await this.rewardModel.find();
    return rewards;
  }

  /**
   * @param id id from the reward you're looking for
   * @returns found reward
   */
  async getReward(id: string): Promise<Reward> {
    const reward: Reward = await this.rewardModel.findById(id);

    if (!reward) {
      throw new NotFoundException('Reward does not exist');
    }

    return reward;
  }

  /**
   * Creates a reward
   * @param dto dto with reward information
   * @returns created reward
   */
  async createReward(dto: CreateRewardDto): Promise<Reward> {
    const reward: Reward = await this.rewardModel.create(dto);
    return reward;
  }

  /**
   * Update a reward
   * @param id id from the reward to update
   * @param dto dto with element to update
   * @returns updated reward
   */
  async updateReward(id: string, dto: UpdateRewardDto): Promise<Reward> {
    const reward = await this.getReward(id);

    if (!reward) {
      throw new NotFoundException('Reward does not exist');
    }

    await this.rewardModel.findByIdAndUpdate(id, dto);

    const doc = await this.getReward(id);

    return doc;
  }

  /**
   * Delete a reard
   * @param id id from the reward to delete
   * @returns ok
   */
  async deleteReward(id: string): Promise<string> {
    await this.rewardModel.findByIdAndDelete(id);

    return 'ok';
  }

  /**
   * @returns active rewards
   */
  async getActiveRewards(points?: number): Promise<Reward[]> {
    if (points) {
      const rewards = await this.rewardModel.find<Reward>({
        status: 'active',
        price: { $lte: points },
      });
      return rewards;
    }

    const rewards = await this.rewardModel.find<Reward>({ status: 'active' });
    return rewards;
  }

  /**
   * @returns active rewards
   */
  async getInactiveRewards(): Promise<Reward[]> {
    const rewards = await this.rewardModel.find<Reward>({ status: 'inactive' });
    return rewards;
  }
}
