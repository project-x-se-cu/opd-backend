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
import { ApiParam } from '@nestjs/swagger';

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
    return {
      _id: prescriptionId,
      status: prescription.status,
      draftMedicinePlans: draftMedicinePlans
    };
  }

  @Put('prescriptions/:id')
  @ApiParam({ name: 'id', required: true })
  async editPrescription(@Param() params, @Body() prescriptionDto: PrescriptionDto) {
    const id = params.id;
    const prescription = await this.prescriptionService.updateStatus(id, 'EDITED');
    const draftMedicinePlans = await this.draftMedicinePlanService.edit(prescriptionDto.draftMedicinePlans);
    return {
      _id: id,
      status: prescription.status,
      draftMedicinePlans: draftMedicinePlans
    };
  }

  @Post('prescriptions/:id/cancel')
  @ApiParam({ name: 'id', required: true })
  async cancelPrescription(@Param() params) {
    const id = params.id;
    const prescription = await this.prescriptionService.updateStatus(id, 'CANCELLED');
    await this.draftMedicinePlanService.updateStatus(id, 'CANCELLED');
    return {
      _id: id,
      status: prescription.status
    };
  }

  // @Post('prescriptions/:id/confirm')
  // @ApiParam({ name: 'id', required: true })
  // async confirmPrescription(@Param() params) {
  //   const id = params.id;
  //   const prescription = await this.prescriptionService.updateStatus(id, 'CONFIRMED');
  //   await this.draftMedicinePlanService.updateStatus(id, 'CONFIRMED');
  //   return {
  //     _id: id,
  //     status: prescription.status
  //   };
  // }
}