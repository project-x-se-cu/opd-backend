import { Module } from '@nestjs/common';
import { DraftMedicinePlanService } from '../services/draft-medicine-plan.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DraftMedicinePlan, DraftMedicinePlanEntity } from 'src/entities/draft-medicine-plan.entity';

@Module({
  providers: [DraftMedicinePlanService],
  exports: [DraftMedicinePlanService],
  imports: [
    MongooseModule.forFeature([{ name: DraftMedicinePlan.name, schema: DraftMedicinePlanEntity }]),
  ],
})
export class OrderPrescriptionTransactionCoordinator {}