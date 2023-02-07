import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Reward } from 'src/models';
import { CreateRewardDto, UpdateRewardDto } from './dto';
import { RewardService } from './reward.service';

@ApiTags('Rewards')
@Controller('reward')
export class RewardController {
  constructor(private rewardService: RewardService) {}

  @Get()
  @ApiOperation({ summary: 'Get all rewards' })
  @ApiOkResponse({ type: Reward, isArray: true })
  async getRewards() {
    return await this.rewardService.getRewards();
  }

  @Get('/find/:id')
  @ApiOperation({ summary: 'Get a reward' })
  @ApiOkResponse({ type: Reward })
  async getReward(@Param('id') id: string) {
    return await this.rewardService.getReward(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a reward' })
  @ApiOkResponse({ type: Reward })
  async createReward(@Body() dto: CreateRewardDto) {
    return await this.rewardService.createReward(dto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a reward' })
  @ApiOkResponse({ type: Reward })
  async updateReward(@Param('id') id: string, @Body() dto: UpdateRewardDto) {
    return await this.rewardService.updateReward(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a reward' })
  @ApiOkResponse({ type: String })
  async deleteReward(@Param('id') id: string) {
    return await this.rewardService.deleteReward(id);
  }

  @Get('/active')
  @ApiOperation({ summary: 'Get active rewards' })
  @ApiOkResponse({ type: Reward, isArray: true })
  async getActiveRewards(@Query('points') points?: number) {
    return await this.rewardService.getActiveRewards(points);
  }

  @Get('/inactive')
  @ApiOperation({ summary: 'Get inactive rewards' })
  @ApiOkResponse({ type: Reward, isArray: true })
  async getInactiveRewards() {
    return await this.rewardService.getInactiveRewards();
  }
}
