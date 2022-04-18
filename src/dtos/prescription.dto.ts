import { DraftMedicinePlanDto } from "./draft-medicine-plan.dto";
import { ApiProperty } from '@nestjs/swagger';
import { MedicinePlanDto } from "./medicine-plan.dto";

export class PrescriptionDto {

    @ApiProperty({
        type: [DraftMedicinePlanDto]
    })
    draftMedicinePlans: DraftMedicinePlanDto[];

    medicinePlans: MedicinePlanDto[];

    status: string;

    @ApiProperty()
    patientId: string;

    @ApiProperty()
    doctorId: string;
}