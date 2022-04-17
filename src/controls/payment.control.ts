import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentDto } from 'src/dtos/payment-dto';
import { RecieptDto } from 'src/dtos/reciept-dto';
import { InvoiceStatus } from 'src/enums/invoice-status.enum';
import { InvoiceService } from 'src/services/invoice.service';
import { RecieptService } from 'src/services/reciept.service';

@ApiTags('Use Case - Make payment')
@Controller()
export class PaymentControl {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly recieptService: RecieptService
  ) { }

  @Post('payments')
  async createPayment(@Body() createPaymentRequest: PaymentDto) {
    const invoice = await this.invoiceService.updateStatus(createPaymentRequest.refId, InvoiceStatus.PAID);
    const invoiceId = invoice._id.toString();
    const reciept = new RecieptDto();
    reciept.refId = 'RECIEPT#' + Math.floor(1000 + Math.random() * 9000);
    reciept.invoiceId = invoiceId;
    reciept.bank = createPaymentRequest.bank;
    return this.recieptService.create(reciept);
  }

}