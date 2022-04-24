import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationDto } from 'src/dtos/notification-dto';
import { PaymentDto } from 'src/dtos/payment-dto';
import { RecieptDto } from 'src/dtos/reciept-dto';
import { InvoiceStatus } from 'src/enums/invoice-status.enum';
import { TwoCTwoPProxy } from 'src/proxies/2c2p.proxy';
import { InvoiceService } from 'src/services/invoice.service';
import { NotificationService } from 'src/services/notification.service';
import { RecieptService } from 'src/services/reciept.service';

@ApiTags('Use Case - Make payment')
@Controller('payments')
export class PaymentControl {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly recieptService: RecieptService,
    private readonly twoCtwoPProxy: TwoCTwoPProxy,
    private readonly notificationService: NotificationService
  ) { }

  @Post('/create')
  async createPayment(@Body() createPaymentRequest: PaymentDto) {
    await this.invoiceService.findByRefId(createPaymentRequest.refId);
    this.twoCtwoPProxy.createPayment();
    return { redirectUrl: 'https://2c2p.com' }
  }

  @Post()
  async makePayment(@Body() makePaymentRequest: PaymentDto) {
    const invoice = await this.invoiceService.updateStatus(makePaymentRequest.refId, InvoiceStatus.PAID);
    const invoiceId = invoice._id.toString();
    const reciept = new RecieptDto();
    reciept.refId = 'RECIEPT#' + Math.floor(1000 + Math.random() * 9000);
    reciept.invoiceId = invoiceId;
    reciept.bank = makePaymentRequest.bank;
    const createdReciept = await this.recieptService.create(reciept);
    this.notifyPatient(makePaymentRequest.refId);
    this.notifyDoctor(makePaymentRequest.refId);
    this.notifyPharmacist(makePaymentRequest.refId);
    return createdReciept;
  }

  notifyPatient(refId: string) {
    const notification = new NotificationDto();
    notification.message = 'ชำระค่าบริการเรียบร้อยแล้ว เลขที่ใบแจ้งหนี้: ' + refId;
    notification.userId = '1';
    this.notificationService.notify(notification);
  }

  notifyDoctor(refId: string) {
    const notification = new NotificationDto();
    notification.message = 'ผู้ป่วยชำระค่าบริการเรียบร้อยแล้ว เลขที่ใบแจ้งหนี้: ' + refId;
    notification.userId = '2';
    this.notificationService.notify(notification);
  }

  notifyPharmacist(refId: string) {
    const notification = new NotificationDto();
    notification.message = 'ผู้ป่วยชำระค่าบริการเรียบร้อยแล้ว เลขที่ใบแจ้งหนี้: ' + refId;
    notification.userId = '3';
    this.notificationService.notify(notification);
  }

}
