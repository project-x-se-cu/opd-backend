import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrescriptionService } from 'src/services/prescription.service';
import { ManagePrescriptionStatusControl } from 'src/controls/manage-prescription-status.control';
import { Prescription, PrescriptionEntity} from 'src/entities/prescription.entity';
import { NotificationControl } from 'src/controls/notification.control';
import { Notification, NotificationEntity } from 'src/entities/notification.entity';
import { NotificationService } from 'src/services/notification.service';

@Module({
    providers: [
      PrescriptionService,
      NotificationService
    ],
    controllers: [
      ManagePrescriptionStatusControl,
      NotificationControl
    ],
    imports: [
      MongooseModule.forFeature([
        { name: Prescription.name, schema: PrescriptionEntity },
        { name: Notification.name, schema: NotificationEntity}
      ])
    ],
})

export class PharmacistCoordinator {}