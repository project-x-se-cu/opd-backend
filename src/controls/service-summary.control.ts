import {
  Controller,
  Get
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServiceSummaryDto } from 'src/dtos/service-summary.dto';
import { Invoice } from 'src/entities/invoice.entity';
import { InvoiceStatus } from 'src/enums/invoice-status.enum';
import { InvoiceService } from 'src/services/invoice.service';
import { RecieptService } from 'src/services/reciept.service';

@ApiTags('Use Case - View service summary')
@Controller()
export class ServiceSummaryControl {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly recieptService: RecieptService
  ) { }

  @Get('service-summaries')
  async getServiceSummarryList() {
    const invoices = await this.invoiceService.findAll();
    const serviceSummaryListResponse = [];
    for (let invoice of invoices) {
      const serviceSummaryResponse = await this.toServiceSummaryResponse(invoice);
      serviceSummaryListResponse.push(serviceSummaryResponse);
    }
    return serviceSummaryListResponse;
  }

  async toServiceSummaryResponse(invoice: Invoice): Promise<ServiceSummaryDto> {
    const serviceSummaryResponse = new ServiceSummaryDto();
    serviceSummaryResponse.refId = invoice.refId;
    serviceSummaryResponse.price = invoice.price;
    serviceSummaryResponse.status = invoice.status;
    serviceSummaryResponse.summary = invoice.summary;
    serviceSummaryResponse.createdAt = invoice.createdAt;
    serviceSummaryResponse.updatedAt = invoice.updatedAt;
    if (invoice.status === InvoiceStatus.PAID) {
      const reciept = await this.recieptService.findByInvoiceId(invoice._id.toString());
      serviceSummaryResponse.refId = reciept.refId;
      serviceSummaryResponse.bank = reciept.bank;
      serviceSummaryResponse.createdAt = reciept.createdAt;
      serviceSummaryResponse.updatedAt = reciept.updatedAt;
    }
    return serviceSummaryResponse;
  }
}