import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PrescriptionDto } from 'src/dtos/prescription.dto';
import { Prescription, PrescriptionDocument } from 'src/entities/prescription.entity';
import { PrescriptionStatus } from 'src/enums/presciption-status.enum';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription.name) private readonly model: Model<PrescriptionDocument>,
  ) { }

  async create(confirmedPrescriptionRequest: PrescriptionDto): Promise<Prescription> {
    const prescription = new PrescriptionDto();
    prescription.patientId = confirmedPrescriptionRequest.patientId;
    prescription.doctorId = confirmedPrescriptionRequest.doctorId;
    prescription.status = PrescriptionStatus.CREATED;
    return await this.model.create(prescription);
  }

  async findAll(): Promise<Prescription[]> {
    return await this.model.find().exec();
  }
}