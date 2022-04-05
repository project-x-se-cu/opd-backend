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
    name: 'medicineName'
  })
  medicineName: String;

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
  timesOfDay: Array<TimeOfDay>;

  @ApiProperty({
    enum: Meal,
    isArray: true,
    example: [Meal.BEFORE, Meal.AFTER]
  })
  meals: Array<Meal>;

  @ApiProperty({
    name: 'remark'
  })
  remark: String;

  prescriptionId: String;
}