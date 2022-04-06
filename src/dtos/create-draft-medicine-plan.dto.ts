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

export class CreateDraftMedicinePlanDto {
  
  @ApiProperty({
    name: 'medicineName'
  })
  medicineName: string;

  @ApiProperty({
    name: 'orderAmount'
  })
  orderAmount: number;

  @ApiProperty({
    name: 'dosage'
  })
  dosage: number;

  @ApiProperty({
    enum: TimeOfDay,
    isArray: true,
    example: [TimeOfDay.MORNING, TimeOfDay.AFTERNOON, TimeOfDay.EVENING, TimeOfDay.NIGHT]
  })
  timesOfDay: TimeOfDay[];

  @ApiProperty({
    enum: Meal,
    isArray: true,
    example: [Meal.BEFORE, Meal.AFTER]
  })
  meals: Meal[];

  @ApiPropertyOptional({
    name: 'remark'
  })
  remark: string;

  status: string;
}