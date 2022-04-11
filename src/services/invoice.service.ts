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

  async findAll(): Promise<Invoice[]> {
    return await this.model.find().exec();
  }

  async create(invoice: InvoiceDto): Promise<Invoice> {
    return await this.model.create(invoice);
  }
}