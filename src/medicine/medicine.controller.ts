import {
  Controller,
  Get,
  Req,
  Query
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { Request } from 'express';

@Controller('medicines')
export class MedicineController {
  constructor(private readonly service: MedicineService) { }

  @Get()
  async index(@Query('name') name: string) {
    return await this.service.findAll(name);
  }
}