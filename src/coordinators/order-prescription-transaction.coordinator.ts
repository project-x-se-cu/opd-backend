import { Module } from '@nestjs/common';
import { DraftMedicinePlanService } from '../services/draft-medicine-plan.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DraftMedicinePlan, DraftMedicinePlanEntity } from 'src/entities/draft-medicine-plan.entity';
import { PrescriptionService } from 'src/services/prescription.service';
import { Prescription, PrescriptionEntity } from 'src/entities/prescription.entity';

@Module({
  providers: [DraftMedicinePlanService, PrescriptionService],
  exports: [DraftMedicinePlanService, PrescriptionService],
  imports: [
    MongooseModule.forFeature([{ name: DraftMedicinePlan.name, schema: DraftMedicinePlanEntity },
      { name: Prescription.name, schema: PrescriptionEntity }]),
  ],
})
export class OrderPrescriptionTransactionCoordinator {}