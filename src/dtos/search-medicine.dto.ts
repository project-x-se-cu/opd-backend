import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchMedicineDto {

    @ApiPropertyOptional({
        name: 'name'
      })
    name: String;
}