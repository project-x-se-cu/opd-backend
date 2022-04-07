import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum DosageTime {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
  NIGHT = 'NIGHT',
}

enum DosageMeal {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER'
}

export class DraftMedicinePlanDto {

  @ApiProperty()
  _id: string;

  @ApiProperty()
  medicineName: string;

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

  prescriptionId: string;
}