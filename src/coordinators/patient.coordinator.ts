import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceEntity } from 'src/entities/invoice.entity';
import { Reciept, RecieptEntity } from 'src/entities/reciept.entity';
import { ServiceSummaryControl } from 'src/controls/service-summary.control';
import { InvoiceService } from 'src/services/invoice.service';
import { RecieptService } from 'src/services/reciept.service';
import { PaymentControl } from 'src/controls/payment.control';
import { PrescriptionService } from 'src/services/prescription.service';
import { ManagePrescriptionStatusControl } from 'src/controls/manage-prescription-status.control';
import { Prescription, PrescriptionEntity} from 'src/entities/prescription.entity';
import { TwoCTwoPProxy } from 'src/proxies/2c2p.proxy';
import { NotificationService } from 'src/services/notification.service';
import { Notification, NotificationEntity } from 'src/entities/notification.entity';

@Module({
  providers: [
    InvoiceService, 
    RecieptService,
    PrescriptionService,
    TwoCTwoPProxy,
    NotificationService
  ],
  controllers: [
    ServiceSummaryControl,
    PaymentControl,
    ManagePrescriptionStatusControl
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceEntity },
      { name: Reciept.name, schema: RecieptEntity },
      { name: Prescription.name, schema: PrescriptionEntity},
      { name: Notification.name, schema: NotificationEntity}
    ])
  ],
})
export class PatientCoordinator {}