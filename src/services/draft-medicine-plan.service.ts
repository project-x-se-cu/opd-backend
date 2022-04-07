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

  // async edit(editDraftMedicinePlanDto: EditDraftMedicinePlanDto[]): Promise<any> {
  //   editDraftMedicinePlanDto.forEach(async plan => {
  //     plan.status = 'EDITED';
  //     const editedDraftMedicinePlan = await this.model.updateOne({ _id: plan._id }, { $set: plan });
  //     console.log(plan._id)
  //   })
  //   return [];
  // }
}