import { ApiPropertyOptional } from '@nestjs/swagger';

export class searchPrescriptionDto {
    @ApiPropertyOptional()
    status: string;

    @ApiPropertyOptional()
    patientId: string;

    @ApiPropertyOptional()
    doctorId: string;
}