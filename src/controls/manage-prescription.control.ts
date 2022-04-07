import {
  Body,
  Controller,
  Get,
  Post,
  Put,
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
  async createPrescription(@Body() prescriptionDto: PrescriptionDto) {
    const prescription = await this.prescriptionService.create();
    const prescriptionId = prescription._id.toString()
    const draftMedicinePlans = await this.draftMedicinePlanService.create(prescriptionDto.draftMedicinePlans, prescriptionId);
    const prescriptionResponse = new PrescriptionDto();
    prescriptionResponse._id = prescriptionId;
    prescriptionResponse.status = prescription.status;
    prescriptionResponse.draftMedicinePlans = draftMedicinePlans;
    return prescriptionResponse;
  }

  // @Put('prescriptions')
  // async editPrescription(@Body() editPrescriptionDto: EditPrescriptionDto) {
  //   const draftMedicinePlans = await this.draftMedicinePlanService.edit(editPrescriptionDto.draftMedicinePlans);
  //   return { draftMedicinePlans: draftMedicinePlans };
  // }
}