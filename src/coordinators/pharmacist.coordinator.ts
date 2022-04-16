import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrescriptionService } from 'src/services/prescription.service';
import { ManagePrescriptionStatusControl } from 'src/controls/manage-prescription-status.control';
import { Prescription, PrescriptionEntity} from 'src/entities/prescription.entity';

@Module({
    providers: [
      PrescriptionService
    ],
    controllers: [
      ManagePrescriptionStatusControl
    ],
    imports: [
      MongooseModule.forFeature([
        { name: Prescription.name, schema: PrescriptionEntity}
      ])
    ],
})

export class PharmacistCoordinator {}