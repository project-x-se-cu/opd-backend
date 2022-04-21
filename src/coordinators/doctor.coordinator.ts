import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagePrescriptionStatusControl } from 'src/controls/manage-prescription-status.control';
import { ManagePrescriptionControl } from 'src/controls/manage-prescription.control';
import { DraftMedicinePlan, DraftMedicinePlanEntity } from 'src/entities/draft-medicine-plan.entity';
import { Invoice, InvoiceEntity } from 'src/entities/invoice.entity';
import { MedicinePlan, MedicinePlanEntity } from 'src/entities/medicine-plan.entity';
import { Prescription, PrescriptionEntity } from 'src/entities/prescription.entity';
import { DraftMedicinePlanService } from 'src/services/draft-medicine-plan.service';
import { InvoiceService } from 'src/services/invoice.service';
import { MedicinePlanService } from 'src/services/medicine-plan.service';
import { PrescriptionService } from 'src/services/prescription.service';
import { OrderPrescriptionTransactionControl } from '../controls/order-prescription.control';
import { Medicine, MedicineEntity } from '../entities/medicine.entity';
import { MedicineService } from '../services/medicine.service';

@Module({
  providers: [
    MedicineService,
    PrescriptionService,
    DraftMedicinePlanService, 
    MedicinePlanService,
    PrescriptionService,
    InvoiceService,
    OrderPrescriptionTransactionControl
  ],
  controllers: [
    ManagePrescriptionControl,
    ManagePrescriptionStatusControl
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineEntity },
      { name: DraftMedicinePlan.name, schema: DraftMedicinePlanEntity },
      { name: MedicinePlan.name, schema: MedicinePlanEntity },
      { name: Prescription.name, schema: PrescriptionEntity },
      { name: Invoice.name, schema: InvoiceEntity }
    ])
  ],
})
export class DoctorCoordinator {}