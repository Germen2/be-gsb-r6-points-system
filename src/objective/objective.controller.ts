import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Objective } from '../models/objective.model';
import { CreateObjectiveDto } from './dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { ObjectiveService } from './objective.service';

@ApiTags('Objective')
@Controller('objective')
export class ObjectiveController {
  constructor(private objectiveService: ObjectiveService) {}

  @Get()
  @ApiOperation({ summary: 'Get all the objectives' })
  @ApiOkResponse({ type: Objective, isArray: true })
  async getObjectives() {
    return await this.objectiveService.getObjectives();
  }

  @Get('/find/:id')
  @ApiOperation({ summary: 'Get an objective by id' })
  @ApiOkResponse({ type: Objective })
  async getObjective(@Param('id') id: string) {
    return await this.objectiveService.getObjective(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new objective' })
  @ApiOkResponse({ type: Objective })
  async createObjective(@Body() dto: CreateObjectiveDto) {
    return await this.objectiveService.createObjective(dto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an objective' })
  @ApiOkResponse({ type: Objective })
  async updateObjective(
    @Param('id') id: string,
    @Body() dto: UpdateObjectiveDto,
  ) {
    return await this.objectiveService.updateObjective(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes an objective' })
  @ApiOkResponse({ type: String })
  async deleteObjective(@Param('id') id: string) {
    return await this.objectiveService.deleteObjective(id);
  }

  @Get('/active')
  @ApiOperation({ summary: 'Get active objectives' })
  @ApiOkResponse({ type: Objective, isArray: true })
  async getActiveObjectives() {
    return await this.objectiveService.getActiveObjectives();
  }

  @Get('/inactive')
  @ApiOperation({ summary: 'Get inactive objectives' })
  @ApiOkResponse({ type: Objective, isArray: true })
  async getInctiveObjectives() {
    return await this.objectiveService.getInactiveObjectives();
  }
}
