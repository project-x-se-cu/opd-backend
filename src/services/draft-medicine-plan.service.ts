import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDraftMedicinePlanDto } from 'src/dtos/create-draft-medicine-plan.dto';
import { DraftMedicinePlan, DraftMedicinePlanDocument } from '../entities/draft-medicine-plan.entity';

@Injectable()
export class DraftMedicinePlanService {
  constructor(
    @InjectModel(DraftMedicinePlan.name) private readonly model: Model<DraftMedicinePlanDocument>,
  ) { }

  async create(createDraftMedicinePlans: CreateDraftMedicinePlanDto[],): Promise<DraftMedicinePlan[]> {
    createDraftMedicinePlans.forEach(plan => {
      plan.status = 'CREATED';
    })
    return await this.model.insertMany(createDraftMedicinePlans);
  }
}