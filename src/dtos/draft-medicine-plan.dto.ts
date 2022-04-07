import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum TimeOfDay {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
  NIGHT = 'NIGHT',
}

enum Meal {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER'
}

export class DraftMedicinePlanDto {

  @ApiProperty()
  _id: string;
  
  @ApiProperty()
  medicineName: string;

  @ApiProperty()
  orderAmount: number;

  @ApiProperty()
  dosage: number;

  @ApiProperty({
    enum: TimeOfDay,
    isArray: true,
    example: [TimeOfDay.MORNING, TimeOfDay.AFTERNOON, TimeOfDay.EVENING, TimeOfDay.NIGHT]
  })
  timesOfDay: string[];

  @ApiProperty({
    enum: Meal,
    isArray: true,
    example: [Meal.BEFORE, Meal.AFTER]
  })
  meals: string[];

  @ApiPropertyOptional()
  remark: string;

  status: string;

  prescriptionId: string;
}