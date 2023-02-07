import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectiveStatus } from '../models/enums';
import { Objective } from '../models/objective.model';
import { CreateObjectiveDto } from './dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

@Injectable()
export class ObjectiveService {
  constructor(
    @InjectModel('Objective') private objectiveModel: Model<Objective>,
  ) {}

  /**
   * @returns array of objectives
   */
  async getObjectives(): Promise<Objective[]> {
    const objetives: Objective[] = await this.objectiveModel.find();
    return objetives;
  }

  /**
   * Looks for an objective with the id
   * @param id objective you're looking for
   * @returns found objective
   */
  async getObjective(id: string): Promise<Objective> {
    const objective: Objective = await this.objectiveModel.findById(id);

    if (!objective) {
      throw new NotFoundException('Objective does not exist');
    }

    return objective;
  }

  /**
   * Creates an objective
   * @param dto dto with the new objective information
   * @returns created objective
   */
  async createObjective(dto: CreateObjectiveDto): Promise<Objective> {
    const objective: Objective = await this.objectiveModel.create(dto);

    return objective;
  }

  /**
   * Updates an objective
   * @param id id from the objective to update
   * @param dto dto with element to update
   */
  async updateObjective(
    id: string,
    dto: UpdateObjectiveDto,
  ): Promise<Objective> {
    const objective: Objective = await this.objectiveModel.findById(id);

    if (!objective) {
      throw new NotFoundException('Objective does not exist');
    }

    await this.objectiveModel.findByIdAndUpdate(id, dto);

    const doc = await this.getObjective(id);
    return doc;
  }

  /**
   * deletes an objective
   * @param id id from the objective to delete
   * @returns ok
   */
  async deleteObjective(id: string): Promise<string> {
    await this.objectiveModel.findByIdAndDelete(id);
    return 'ok';
  }

  /**
   * @returns Active objectives
   */
  async getActiveObjectives(): Promise<Objective[]> {
    const objectives = await this.objectiveModel
      .find<Objective>({
        status: ObjectiveStatus.active,
      })
      .sort({ points: -1 });
    return objectives;
  }

  /**
   * @returns Inactive objectives
   */
  async getInactiveObjectives(): Promise<Objective[]> {
    const objectives = await this.objectiveModel.find<Objective>({
      status: ObjectiveStatus.inactive,
    });
    return objectives;
  }
}
