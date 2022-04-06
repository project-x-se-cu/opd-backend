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
import { CreatePrescriptionDto } from 'src/dtos/create-prescription.dto';
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
  async createPrescription(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    const draftMedicinePlans = await this.draftMedicinePlanService.create(createPrescriptionDto.draftMedicinePlans);
    return { draftMedicinePlans: draftMedicinePlans };
  }
}