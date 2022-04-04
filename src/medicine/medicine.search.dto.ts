import { ApiPropertyOptional } from '@nestjs/swagger';

export class MedicineSearchDto {

    @ApiPropertyOptional({
        name: 'name'
      })
    name: string;
}