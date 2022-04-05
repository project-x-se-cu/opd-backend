import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DraftMedicinePlanDto } from 'src/dtos/draft-medicine-plan.dto';
import { DraftMedicinePlan, DraftMedicinePlanDocument } from '../entities/draft-medicine-plan.entity';

@Injectable()
export class DraftMedicinePlanService {
  constructor(
    @InjectModel(DraftMedicinePlan.name) private readonly model: Model<DraftMedicinePlanDocument>,
  ) { }

  async create(draftMedicinePlans: Array<DraftMedicinePlanDto>, prescriptionId: String): Promise<Array<DraftMedicinePlan>> {
    draftMedicinePlans.forEach(plan => {
      plan.prescriptionId = prescriptionId;
    })
    return await this.model.insertMany(draftMedicinePlans);
  }
}