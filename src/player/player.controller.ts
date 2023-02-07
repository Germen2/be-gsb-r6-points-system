import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Player } from '../models';
import { CreatePlayerDto, UpdatePlayerDto, UpdatePlayerPointsDto } from './dto';
import { PlayerService } from './player.service';

@ApiTags('Player')
@Controller('player')
@UseGuards(AuthGuard())
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  @ApiOkResponse({ type: Player, isArray: true })
  @ApiOperation({ summary: 'Get all players' })
  async getPlayers() {
    return await this.playerService.getPlayers();
  }

  @Get('/find/:id')
  @ApiOkResponse({ type: Player })
  @ApiOperation({ summary: 'Get a player' })
  async getPlayer(@Param('id') id: string) {
    return await this.playerService.getPlayer(id);
  }

  @Post()
  @ApiOkResponse({ type: Player })
  @ApiOperation({ summary: 'Create a player' })
  async createPlayer(@Body() dto: CreatePlayerDto) {
    return await this.playerService.createPlayer(dto);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: Player })
  @ApiOperation({ summary: 'Update a player' })
  async updatePlayer(@Param('id') id: string, @Body() dto: UpdatePlayerDto) {
    return await this.playerService.updatePlayer(id, dto);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: String })
  @ApiOperation({ summary: 'Delete a player' })
  async deletePlayer(@Param('id') id: string) {
    return await this.playerService.deletePlayer(id);
  }

  @Get('/active')
  @ApiOkResponse({ type: Player, isArray: true })
  @ApiOperation({ summary: 'Get all active players' })
  async getActivePlayers() {
    return await this.playerService.getActivePlayers();
  }

  @Get('/inactive')
  @ApiOkResponse({ type: Player, isArray: true })
  @ApiOperation({ summary: 'Get all inactive players' })
  async getInactivePlayers() {
    return await this.playerService.getInactivePlayers();
  }

  @Patch('/:id/points')
  @ApiOkResponse({ type: Player })
  @ApiOperation({ summary: 'Updates a player point count' })
  async updatePlayerPoints(
    @Param('id') id: string,
    @Body() dto: UpdatePlayerPointsDto,
  ) {
    return await this.playerService.updatePlayerPoints(id, dto);
  }

  @Post('/:id/redeem')
  @ApiOperation({ summary: 'Redeem a reward' })
  @ApiOkResponse({ type: String })
  async redeemReward(@Param('id') id: string, @Body() dto: { price: number }) {
    return await this.playerService.redeemReward(id, dto);
  }
}
