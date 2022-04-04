import {
  Controller,
  Get,
  Query
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineSearchDto } from './medicine.search.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medicines')
@Controller('medicines')
export class MedicineController {
  constructor(private readonly service: MedicineService) { }

  @Get()
  async index(@Query() medicineSearchDto: MedicineSearchDto) {
    return await this.service.findAll(medicineSearchDto.name);
  }
}