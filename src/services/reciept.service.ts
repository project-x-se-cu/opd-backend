import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reciept, RecieptDocument } from 'src/entities/reciept.entity';

@Injectable()
export class RecieptService {
  constructor(
    @InjectModel(Reciept.name) private readonly model: Model<RecieptDocument>,
  ) { }

  async findByInvoiceId(invoiceId: string): Promise<Reciept> {
    return await this.model.findOne({ invoiceId: invoiceId }).exec();
  }
}