import {
    Controller,
    Get,
    Query
  } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { PrescriptionService } from 'src/services/prescription.service';
import { PrescriptionDto } from 'src/dtos/prescription.dto';

@ApiTags('Use Case - View prescription status')
@Controller()
export class ManagePrescriptionStatusControl{
    constructor(
        private readonly prescriptionService: PrescriptionService
    ){}

    @Get('prescriptions')
    async getPrescriptionList() {
    return await this.prescriptionService.findAll();
  }
}