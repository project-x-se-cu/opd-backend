import { Module } from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { ManagePrescriptionControl } from '../controls/manage-prescription.control';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicine, MedicineEntity } from '../entities/medicine.entity';
import { OrderPrescriptionTransactionCoordinator } from './order-prescription-transaction.coordinator';

@Module({
  providers: [MedicineService],
  controllers: [ManagePrescriptionControl],
  imports: [
    MongooseModule.forFeature([{ name: Medicine.name, schema: MedicineEntity }]),
    OrderPrescriptionTransactionCoordinator
  ],
})
export class DoctorCoordinator {}