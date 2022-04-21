import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrescriptionDto } from 'src/dtos/prescription.dto';
import { MedicineService } from 'src/services/medicine.service';
import { SearchMedicineDto } from '../dtos/search-medicine.dto';
import { OrderPrescriptionTransactionControl } from './order-prescription.control';

@ApiTags('Use Case - Issue a prescription')
@Controller()
export class ManagePrescriptionControl {
  constructor(private readonly orderPrescriptionTransactionControl: OrderPrescriptionTransactionControl,
    private readonly medicineService: MedicineService
  ) { }

  @Get('medicines')
  async getMedicineList(@Query() searchMedicineDto: SearchMedicineDto) {
    return await this.medicineService.findAll(searchMedicineDto.name);
  }

  @Post('prescriptions')
  async createPrescription(@Body() createPrescriptionRequest: PrescriptionDto) {
    return await this.orderPrescriptionTransactionControl.createPrescription(createPrescriptionRequest);
  }

  @Put('prescriptions')
  async editPrescription(@Body() editPrescriptionRequest: PrescriptionDto) {
    return await this.orderPrescriptionTransactionControl.editPrescription(editPrescriptionRequest);
  }

  @Post('prescriptions/cancel')
  async cancelPrescription(@Body() cancelPrescriptionRequest: PrescriptionDto) {
    return await this.orderPrescriptionTransactionControl.cancelPrescription(cancelPrescriptionRequest);
  }

  @Post('prescriptions/confirm')
  async confirmPrescription(@Body() confirmedPrescriptionRequest: PrescriptionDto) {
    return await this.orderPrescriptionTransactionControl.confirmPrescription(confirmedPrescriptionRequest);
  }
}