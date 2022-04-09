import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { DraftMedicinePlanService } from '../services/draft-medicine-plan.service';
import { SearchMedicineDto } from '../dtos/search-medicine.dto';
import { PrescriptionDto } from 'src/dtos/prescription.dto';
import { PrescriptionService } from 'src/services/prescription.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MedicinePlanService } from 'src/services/medicine-plan.service';
import { Prescription } from 'src/entities/prescription.entity';
import { DraftMedicinePlan } from 'src/entities/draft-medicine-plan.entity';

@ApiTags('Use Case - Issue a prescription')
@Controller()
export class ManagePrescriptionControl {
  constructor(private readonly medicineService: MedicineService,
    private readonly draftMedicinePlanService: DraftMedicinePlanService,
    private readonly medicinePlanService: MedicinePlanService,
    private readonly prescriptionService: PrescriptionService,
  ) { }

  @Get('medicines')
  async getMedicineList(@Query() searchMedicineDto: SearchMedicineDto) {
    return await this.medicineService.findAll(searchMedicineDto.name);
  }

  @Post('prescriptions')
  async createPrescription(@Body() createPrescriptionRequest: PrescriptionDto) {
    const createdPrescription = await this.prescriptionService.create();
    const createdPrescriptionId = createdPrescription._id.toString();
    const createdDraftMedicinePlans = await this.draftMedicinePlanService.create(createPrescriptionRequest.draftMedicinePlans, createdPrescriptionId);
    return this.toPrescriptionResponse(createdPrescriptionId, createdPrescription, createdDraftMedicinePlans);
  }

  @Put('prescriptions/:id')
  @ApiParam({ name: 'id', required: true })
  async editPrescription(@Param('id') id: string, @Body() editPrescriptionRequest: PrescriptionDto) {
    const editedPrescription = await this.prescriptionService.updateStatusById(id, 'EDITED');
    const editedDraftMedicinePlans = await this.draftMedicinePlanService.edit(editPrescriptionRequest.draftMedicinePlans);
    return this.toPrescriptionResponse(id, editedPrescription, editedDraftMedicinePlans);
  }

  toPrescriptionResponse(prescriptionId: string, prescription: Prescription, draftMedicinePlans: DraftMedicinePlan[]): PrescriptionDto {
    const prescriptionResponse = new PrescriptionDto();
    prescriptionResponse._id = prescriptionId;
    prescriptionResponse.status = prescription.status;
    prescriptionResponse.draftMedicinePlans = draftMedicinePlans;
    return prescriptionResponse;
  }

  @Post('prescriptions/:id/cancel')
  @ApiParam({ name: 'id', required: true })
  async cancelPrescription(@Param('id') id: string) {
    const cancelledPrescription = await this.prescriptionService.updateStatusById(id, 'CANCELLED');
    await this.draftMedicinePlanService.updateStatusByPrescriptionId(id, 'CANCELLED');
    return {
      _id: id,
      status: cancelledPrescription.status
    };
  }

  @Post('prescriptions/:id/confirm')
  @ApiParam({ name: 'id', required: true })
  async confirmPrescription(@Param('id') id: string) {
    const confirmedPrescription = await this.prescriptionService.updateStatusById(id, 'CREATED');
    const draftMedicinePlans = await this.draftMedicinePlanService.findByPrescriptionId(id);
    const medicinePlans = draftMedicinePlans.map(plan => 
      this.draftMedicinePlanService.toMedicinePlanDto(plan));
    await this.medicinePlanService.create(medicinePlans, id);
    return {
      _id: id,
      status: confirmedPrescription.status
    };
  }
}