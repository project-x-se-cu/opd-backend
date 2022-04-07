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

  async create(draftMedicinePlans: DraftMedicinePlanDto[], prescriptionId: string): Promise<DraftMedicinePlan[]> {
    draftMedicinePlans.forEach(plan => {
      plan.status = 'CREATED';
      plan.prescriptionId = prescriptionId;
    })
    return await this.model.insertMany(draftMedicinePlans);
  }

  async edit(draftMedicinePlans: DraftMedicinePlanDto[]): Promise<DraftMedicinePlan[]> {
    const editedDraftMedicinePlans = [];
    for (let plan of draftMedicinePlans) {
      plan.status = 'EDITED';
      const editedPlan = await this.model.findByIdAndUpdate(plan._id, plan, { new: true })
      editedDraftMedicinePlans.push(editedPlan);
    }
    return editedDraftMedicinePlans;
  }

  async updateStatus(prescriptionId: string, status: string): Promise<void> {
    await this.model.updateMany({ prescriptionId: prescriptionId }, { status: status });
  }
}