import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    name: 'name'
  })
  name: String;

  @ApiProperty({
    name: 'orderAmount'
  })
  orderAmount: Number;

  @ApiProperty({
    name: 'dosage'
  })
  dosage: Number;

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

  @ApiProperty({
    name: 'remark'
  })
  remark: String;

  prescriptionId: String;
}