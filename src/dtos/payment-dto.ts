import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {

  @ApiProperty()
  refId: string;

  @ApiProperty()
  bank: string;
}