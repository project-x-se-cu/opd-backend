import { Module } from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { ManagePrescriptionControl } from '../controls/manage-prescription.control';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicine, MedicineEntity } from '../entities/medicine.entity';
import { OrderPrescriptionTransactionCoordinator } from './order-prescription-transaction.coordinator';
import { PrescriptionService } from 'src/services/prescription.service';
import { ManagePrescriptionStatusControl } from 'src/controls/manage-prescription-status.control';
import { Prescription, PrescriptionEntity} from 'src/entities/prescription.entity';

@Module({
  providers: [
    MedicineService,
    PrescriptionService
  ],
  controllers: [
    ManagePrescriptionControl,
    ManagePrescriptionStatusControl
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Medicine.name, schema: MedicineEntity },
      { name: Prescription.name, schema: PrescriptionEntity}
    ]),
    OrderPrescriptionTransactionCoordinator
  ],
})
export class DoctorCoordinator {}