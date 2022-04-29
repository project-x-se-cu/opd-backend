import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER_PRESCRIPTION_TRANSACTION_CONTROL } from 'src/controls/i-order-prescription-transaction.control';
import { ManagePrescriptionStatusControl } from 'src/controls/manage-prescription-status.control';
import { ManagePrescriptionControl } from 'src/controls/manage-prescription.control';
import { NotificationControl } from 'src/controls/notification.control';
import { DraftMedicinePlan, DraftMedicinePlanEntity } from 'src/entities/draft-medicine-plan.entity';
import { Invoice, InvoiceEntity } from 'src/entities/invoice.entity';
import { MedicinePlan, MedicinePlanEntity } from 'src/entities/medicine-plan.entity';
import { Notification, NotificationEntity } from 'src/entities/notification.entity';
import { Prescription, PrescriptionEntity } from 'src/entities/prescription.entity';
import { DraftMedicinePlanService } from 'src/services/draft-medicine-plan.service';
import { InvoiceService } from 'src/services/invoice.service';
import { MedicinePlanService } from 'src/services/medicine-plan.service';
import { NotificationService } from 'src/services/notification.service';
import { PrescriptionService } from 'src/services/prescription.service';
import { OrderPrescriptionTransactionControl } from '../controls/order-prescription-transaction.control';
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
    {
      provide: ORDER_PRESCRIPTION_TRANSACTION_CONTROL,
      useClass: OrderPrescriptionTransactionControl
    },
    NotificationService
  ],
  controllers: [
    ManagePrescriptionControl,
    ManagePrescriptionStatusControl,
    NotificationControl
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineEntity },
      { name: DraftMedicinePlan.name, schema: DraftMedicinePlanEntity },
      { name: MedicinePlan.name, schema: MedicinePlanEntity },
      { name: Prescription.name, schema: PrescriptionEntity },
      { name: Invoice.name, schema: InvoiceEntity },
      { name: Notification.name, schema: NotificationEntity }
    ])
  ],
})
export class DoctorCoordinator {}