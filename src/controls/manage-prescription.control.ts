import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrescriptionDto } from 'src/dtos/prescription.dto';
import { MedicineService } from 'src/services/medicine.service';
import { SearchMedicineDto } from '../dtos/search-medicine.dto';
import { IOrderPrescriptionTransactionControl, ORDER_PRESCRIPTION_TRANSACTION_CONTROL } from './i-order-prescription-transaction.control';

@ApiTags('Use Case - Issue a prescription')
@Controller()
export class ManagePrescriptionControl {
  constructor( 
    @Inject(ORDER_PRESCRIPTION_TRANSACTION_CONTROL) private readonly orderPrescriptionTransactionControl: IOrderPrescriptionTransactionControl,
    private readonly medicineService: MedicineService
  ) { }

  @Get('medicines')
  async getMedicineList(@Query() searchMedicineDto: SearchMedicineDto) {
    return await this.medicineService.findAll(searchMedicineDto.name);
  }

  @Post('prescriptions')
  async createPrescription(@Body() createPrescriptionRequest: PrescriptionDto) {
    return await this.orderPrescriptionTransactionControl.createPrescriptionRequest(createPrescriptionRequest);
  }

  @Put('prescriptions')
  async editPrescription(@Body() editPrescriptionRequest: PrescriptionDto) {
    return await this.orderPrescriptionTransactionControl.editPrescription(editPrescriptionRequest);
  }

  @Post('prescriptions/confirm')
  async confirmPrescription(@Body() confirmedPrescriptionRequest: PrescriptionDto) {
    return await this.orderPrescriptionTransactionControl.confirmPrescription(confirmedPrescriptionRequest);
  }

  @Post('prescriptions/cancel')
  async cancelPrescription(@Body() cancelPrescriptionRequest: PrescriptionDto) {
    return await this.orderPrescriptionTransactionControl.cancelPrescription(cancelPrescriptionRequest);
  }
}