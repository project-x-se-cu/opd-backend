import { ApiProperty } from '@nestjs/swagger';

export class SearchServiceSummaryDto {
  
    @ApiProperty()
    userId: string;
}