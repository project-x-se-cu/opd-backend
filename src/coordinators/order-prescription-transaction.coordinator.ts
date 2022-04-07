import { Module } from '@nestjs/common';
import { DraftMedicinePlanService } from '../services/draft-medicine-plan.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DraftMedicinePlan, DraftMedicinePlanEntity } from 'src/entities/draft-medicine-plan.entity';
import { PrescriptionService } from 'src/services/prescription.service';
import { Prescription, PrescriptionEntity } from 'src/entities/prescription.entity';
import { MedicinePlanService } from 'src/services/medicine-plan.service';
import { MedicinePlan, MedicinePlanEntity } from 'src/entities/medicine-plan.entity';

@Module({
  providers: [
    DraftMedicinePlanService, 
    MedicinePlanService, 
    PrescriptionService
  ],
  exports: [
    DraftMedicinePlanService, 
    MedicinePlanService, 
    PrescriptionService],
  imports: [
    MongooseModule.forFeature([
      { name: DraftMedicinePlan.name, schema: DraftMedicinePlanEntity },
      { name: MedicinePlan.name, schema: MedicinePlanEntity },
      { name: Prescription.name, schema: PrescriptionEntity }
    ]),
  ],
})
export class OrderPrescriptionTransactionCoordinator {}