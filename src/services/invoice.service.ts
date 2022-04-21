import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDto } from 'src/dtos/invoice.dto';
import { Invoice, InvoiceDocument } from 'src/entities/invoice.entity';
import { InvoiceStatus } from 'src/enums/invoice-status.enum';

@Injectable()
export class InvoiceService {

  constructor(
    @InjectModel(Invoice.name) private readonly model: Model<InvoiceDocument>,
  ) { }

  async findAll(): Promise<Invoice[]> {
    return await this.model.find().exec();
  }

  async findByRefId(refId: string) {
    return await this.model.findOne({ refId: refId }).exec();
  }

  async create(invoice: InvoiceDto): Promise<Invoice> {
    return await this.model.create(invoice);
  }

  async updateStatus(refId: string, status: InvoiceStatus): Promise<Invoice> {
    return await this.model.findOneAndUpdate({ refId: refId }, { $set: { status: status } }, { new: true })
  }
}