import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerStatus } from '../models/enums';
import { Player } from '../models';
import {
  CreatePlayerDto,
  SearchPlayerDto,
  UpdatePlayerDto,
  UpdatePlayerPointsDto,
} from './dto';

@Injectable()
export class PlayerService {
  constructor(@InjectModel('Player') private playerModel: Model<Player>) {}

  /**
   * @returns array of players
   */
  async getPlayers(): Promise<Player[]> {
    const players: Player[] = await this.playerModel.find();
    return players;
  }

  /**
   *
   * @param id id of the player you're looking for
   * @returns found player
   */
  async getPlayer(id: string): Promise<Player> {
    const player: Player = await this.playerModel.findById(id);

    if (!player) {
      throw new NotFoundException('Player does not exists');
    }

    return player;
  }

  /**
   * @returns inactive players
   */
  async getInactivePlayers(): Promise<Player[]> {
    const players: Player[] = await this.playerModel.find({
      status: PlayerStatus.inactive,
    });

    return players;
  }

  /**
   * @returns active players
   */
  async getActivePlayers(): Promise<Player[]> {
    const players: Player[] = await this.playerModel
      .find({
        status: PlayerStatus.active,
      })
      .sort({ points: -1 });

    return players;
  }

  /**
   * Checks if player with same username as sent already exists,
   * if not, creates player
   * @param dto dto with new player user
   * @returns created player
   */
  async createPlayer(dto: CreatePlayerDto): Promise<Player> {
    const player = await this.playerModel.findOne({ username: dto.username });

    if (player) {
      throw new ConflictException('A player with that username already exists');
    }

    const createdPlayer: Player = await this.playerModel.create(dto);

    return createdPlayer;
  }

  /**
   * Checks if player exists, if yes, updates user, if not, throw exception
   * @param id id from the player to update
   * @param dto dto with information to update
   * @returns updated player
   */
  async updatePlayer(id: string, dto: UpdatePlayerDto): Promise<Player> {
    const player: Player = await this.getPlayer(id);

    if (!player) {
      throw new NotFoundException('Player does not exist');
    }

    await this.playerModel.findByIdAndUpdate(id, dto);

    const updatedPlayer: Player = await this.getPlayer(id);
    return updatedPlayer;
  }

  /**
   * Updates a player points
   * @param id id of the player to be updated
   * @param dto points to add or take
   * @returns updated player
   */
  async updatePlayerPoints(
    id: string,
    dto: UpdatePlayerPointsDto,
  ): Promise<Player> {
    const player = await this.getPlayer(id);

    if (!player) {
      throw new NotFoundException('Player does not exist');
    }

    const updatedPoints = { points: player.points + dto.quantity };

    if (updatedPoints.points < 0) {
      updatedPoints.points = 0;
    }
    await this.playerModel.findByIdAndUpdate(id, updatedPoints);
    const updatedPlayer: Player = await this.getPlayer(id);
    return updatedPlayer;
  }

  /**
   * @param id id from the player to delete
   * @returns ok
   */
  async deletePlayer(id: string): Promise<string> {
    await this.playerModel.findByIdAndDelete(id);
    return 'ok';
  }

  /**
   * Player redeems a reward
   * @param id id from the player whos redeeming
   * @param price price of the reward
   * @returns ok if posible to redeem
   */
  async redeemReward(id: string, dto: { price: number }): Promise<Player> {
    const player = await this.getPlayer(id);

    const updatedPoints = player.points - dto.price;

    if (updatedPoints < 0) {
      throw new ConflictException(
        'No tienes suficientes puntos para esta recompensa',
      );
    }

    await this.updatePlayerPoints(id, { quantity: -dto.price });
    const updatedPlayer = await this.getPlayer(id);

    return updatedPlayer;
  }

  private async searchPlayer(dto: SearchPlayerDto): Promise<Player[]> {
    const query = [];

    Object.keys(dto).forEach((element) => {
      const obj = {};
      obj[element] = dto[element];
      query.push(obj);
    });

    const players: Player[] = await this.playerModel.find({
      $or: query,
    });

    return players;
  }
}
