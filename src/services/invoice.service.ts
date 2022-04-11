import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDto } from 'src/dtos/invoice.dto';
import { Invoice, InvoiceDocument } from 'src/entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private readonly model: Model<InvoiceDocument>,
  ) { }

  async create(invoice: InvoiceDto): Promise<Invoice> {
    return await this.model.create(invoice);
  }

  async findByUserId(userId: string): Promise<Invoice[]> {
    return await this.model.find({ userId: userId }).exec();
  }
}