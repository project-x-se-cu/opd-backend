import {
    Controller,
    Get,
    Query
  } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { PrescriptionService } from 'src/services/prescription.service';
import { searchPrescriptionDto } from 'src/dtos/search-prescription.dto';

@ApiTags('Use Case - View prescription status')
@Controller()
export class ManagePrescriptionStatusControl{
  constructor(
    private readonly prescriptionService: PrescriptionService
  ){}

  @Get('prescriptions')
  async getPrescriptionList(@Query() query: searchPrescriptionDto) {
    return await this.prescriptionService.findAll(query);
  }
}