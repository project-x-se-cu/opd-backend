import {
  Controller,
  Get,
  Query
} from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { SearchMedicineDto } from '../dtos/search-medicine.dto';

@Controller('medicines')
export class ManagePrescriptionControl {
  constructor(private readonly service: MedicineService) { }

  @Get()
  async index(@Query() searchMedicineDto: SearchMedicineDto) {
    return await this.service.findAll(searchMedicineDto.name);
  }
}