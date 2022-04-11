import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {DosageTime} from 'src/enums/dosage-time.enum';
import {DosageMeal} from 'src/enums/dosage-meal.enum'

export class DraftMedicinePlanDto {

  @ApiProperty()
  _id?: string;

  @ApiProperty()
  medicineName: string;

  @ApiProperty()
  properties: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  dosage: number;

  @ApiProperty({
    enum: DosageTime,
    isArray: true,
    example: [DosageTime.MORNING, DosageTime.AFTERNOON, DosageTime.EVENING, DosageTime.NIGHT]
  })
  dosageTimes: string[];

  @ApiProperty({
    enum: DosageMeal,
    isArray: true,
    example: [DosageMeal.BEFORE, DosageMeal.AFTER]
  })
  dosageMeals: string[];

  @ApiPropertyOptional()
  remark: string;

  status: string;
}