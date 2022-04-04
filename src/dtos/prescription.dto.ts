import { DraftMedicinePlanDto } from "./draft-medicine-plan.dto";
import { ApiProperty } from '@nestjs/swagger';

export class PrescriptionDto {

    @ApiProperty({
        name: 'draftMedicinePlans',
        type: [DraftMedicinePlanDto]
    })
    draftMedicinePlans: DraftMedicinePlanDto[];
}