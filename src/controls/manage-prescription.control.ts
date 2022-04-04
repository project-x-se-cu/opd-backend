import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { DraftMedicinePlanService } from '../services/draft-medicine-plan.service';
import { SearchMedicineDto } from '../dtos/search-medicine.dto';
import { PrescriptionDto } from 'src/dtos/prescription.dto';
import { PrescriptionService } from 'src/services/prescription.service';

@Controller()
export class ManagePrescriptionControl {
  constructor(private readonly medicineService: MedicineService,
    private readonly draftMedicinePlanService: DraftMedicinePlanService,
    private readonly prescriptionService: PrescriptionService,
    ) { }

  @Get('medicines')
  async getMedicineList(@Query() searchMedicineDto: SearchMedicineDto) {
    return await this.medicineService.findAll(searchMedicineDto.name);
  }

  @Post('prescriptions')
  async createPrescription(@Body() prescriptionDto : PrescriptionDto) {
    var prescription = await this.prescriptionService.create();
    var draftMedicinePlans = await this.draftMedicinePlanService.create(prescriptionDto.draftMedicinePlans, prescription._id.toString());
    prescription.draftMedicinePlans = draftMedicinePlans;
    return prescription;
  }
}