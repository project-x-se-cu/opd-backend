import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceEntity } from 'src/entities/invoice.entity';
import { Reciept, RecieptEntity } from 'src/entities/reciept.entity';
import { ServiceSummaryControl } from 'src/controls/service-summary.control';
import { InvoiceService } from 'src/services/invoice.service';
import { RecieptService } from 'src/services/reciept.service';
import { PrescriptionService } from 'src/services/prescription.service';
import { ManagePrescriptionStatusControl } from 'src/controls/manage-prescription-status.control';
import { Prescription, PrescriptionEntity} from 'src/entities/prescription.entity';

@Module({
  providers: [
    InvoiceService, 
    RecieptService,
    PrescriptionService
  ],
  controllers: [
    ServiceSummaryControl,
    ManagePrescriptionStatusControl
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceEntity },
      { name: Reciept.name, schema: RecieptEntity },
      { name: Prescription.name, schema: PrescriptionEntity}
    ])
  ],
})
export class PatientCoordinator {}