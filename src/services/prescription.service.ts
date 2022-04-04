import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prescription, PrescriptionDocument } from 'src/entities/prescription.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription.name) private readonly model: Model<PrescriptionDocument>,
  ) { }

  async create(): Promise<Prescription> {
    return await this.model.create({ status: 'DRAFT' });
  }
}