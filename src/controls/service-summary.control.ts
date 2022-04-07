import {
  Controller,
  Get,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchServiceSummaryDto } from 'src/dtos/search-service-summary.dto';
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
  async getServiceSummarryList(@Query() searchServiceSummaryDto: SearchServiceSummaryDto) {
    const invoices = await this.invoiceService.findByAppointmentId(searchServiceSummaryDto.userId);
    const serviceSummaryList = [];
    for (let invoice of invoices) {
      const serviceSummary = {
        refId: invoice.refId,
        amount: invoice.amount,
        status: invoice.status,
        summary: invoice.summary,
        bank: null,
        createdAt: invoice.createdAt
      };
      if (invoice.status === 'PAID') {
        const reciept = await this.recieptService.findByInvoiceId(invoice._id.toString());
        serviceSummary.refId = reciept.refId;
        serviceSummary.bank = reciept.bank;
        serviceSummary.createdAt = reciept.createdAt;
      }
      serviceSummaryList.push(serviceSummary);
    }
    return serviceSummaryList;
  }
}