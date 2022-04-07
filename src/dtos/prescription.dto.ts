import { DraftMedicinePlanDto } from "./draft-medicine-plan.dto";
import { ApiProperty } from '@nestjs/swagger';

export class PrescriptionDto {

    _id: string;

    status: string;

    @ApiProperty({
        type: [DraftMedicinePlanDto]
    })
    draftMedicinePlans: DraftMedicinePlanDto[];
}