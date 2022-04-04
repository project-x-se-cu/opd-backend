import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicine, MedicineDocument } from '../entities/medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectModel(Medicine.name) private readonly model: Model<MedicineDocument>,
  ) { }

  async findAll(name: String): Promise<Medicine[]> {
    if (name) {
      return await this.model.find(
        { name: { '$regex': name, '$options': 'i' } }
      ).exec();
    }
    return await this.model.find().exec();
  }
}