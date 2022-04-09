import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MedicinePlanDto } from 'src/dtos/medicine-plan.dto';
import { MedicinePlan, MedicinePlanDocument } from 'src/entities/medicine-plan.entity';
import { MedicincePlanStatus } from 'src/enums/medicine-plan-status.enum';

@Injectable()
export class MedicinePlanService {
  constructor(
    @InjectModel(MedicinePlan.name) private readonly model: Model<MedicinePlanDocument>,
  ) { }

  async create(medicinePlans: MedicinePlanDto[], prescriptionId: string): Promise<MedicinePlan[]> {
    medicinePlans.forEach(plan => {
      plan.status = MedicincePlanStatus.CREATED;
      plan.prescriptionId = prescriptionId;
    })
    return await this.model.insertMany(medicinePlans);
  }
}