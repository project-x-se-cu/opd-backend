import { DraftMedicinePlanDto } from "./draft-medicine-plan.dto";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {

    @ApiProperty({
        name: 'draftMedicinePlans',
        type: [DraftMedicinePlanDto]
    })
    draftMedicinePlans: DraftMedicinePlanDto[];
}