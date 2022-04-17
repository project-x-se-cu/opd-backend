import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceEntity } from 'src/entities/invoice.entity';
import { Reciept, RecieptEntity } from 'src/entities/reciept.entity';
import { ServiceSummaryControl } from 'src/controls/service-summary.control';
import { InvoiceService } from 'src/services/invoice.service';
import { RecieptService } from 'src/services/reciept.service';
import { PaymentControl } from 'src/controls/payment.control';

@Module({
  providers: [
    InvoiceService, 
    RecieptService
  ],
  controllers: [
    ServiceSummaryControl,
    PaymentControl
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceEntity },
      { name: Reciept.name, schema: RecieptEntity }
    ])
  ],
})
export class PatientCoordinator {}