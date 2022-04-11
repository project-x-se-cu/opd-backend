import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DraftMedicinePlanDto } from 'src/dtos/draft-medicine-plan.dto';
import { DraftMedicincePlanStatus } from 'src/enums/draft-medicine-plan-status.enum';
import { DraftMedicinePlan, DraftMedicinePlanDocument } from '../entities/draft-medicine-plan.entity';

@Injectable()
export class DraftMedicinePlanService {
  constructor(
    @InjectModel(DraftMedicinePlan.name) private readonly model: Model<DraftMedicinePlanDocument>,
  ) { }

  async create(draftMedicinePlans: DraftMedicinePlanDto[]): Promise<DraftMedicinePlan[]> {
    draftMedicinePlans.forEach(plan => {
      plan.status = DraftMedicincePlanStatus.CREATED;
    })
    return await this.model.insertMany(draftMedicinePlans);
  }

  async edit(draftMedicinePlans: DraftMedicinePlanDto[]): Promise<DraftMedicinePlan[]> {
    const editedDraftMedicinePlans = [];
    for (let plan of draftMedicinePlans) {
      plan.status = DraftMedicincePlanStatus.EDITED;
      const editedPlan = await this.model.findByIdAndUpdate(plan._id, plan, { new: true })
      editedDraftMedicinePlans.push(editedPlan);
    }
    return editedDraftMedicinePlans;
  }

  async cancel(draftMedicinePlans: DraftMedicinePlanDto[]): Promise<DraftMedicinePlan[]> {
    const canceledDraftMedicinePlans = [];
    for (let plan of draftMedicinePlans) {
      const canceledPlan = await this.model.findByIdAndUpdate(plan._id, { $set: { status: DraftMedicincePlanStatus.CANCELED } }, { new: true })
      canceledDraftMedicinePlans.push(canceledPlan);
    }
    return canceledDraftMedicinePlans;
  }

  async delete(draftMedicinePlans: DraftMedicinePlanDto[]): Promise<DraftMedicinePlan[]> {
    const deletedDraftMedicinePlans = [];
    for (let plan of draftMedicinePlans) {
      const canceledPlan = await this.model.findByIdAndUpdate(plan._id, { $set: { status: DraftMedicincePlanStatus.DELETE } }, { new: true })
      deletedDraftMedicinePlans.push(canceledPlan);
    }
    return deletedDraftMedicinePlans;
  }
}