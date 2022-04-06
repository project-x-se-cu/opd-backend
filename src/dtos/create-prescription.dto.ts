import { CreateDraftMedicinePlanDto } from "./create-draft-medicine-plan.dto";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrescriptionDto {

    @ApiProperty({
        name: 'draftMedicinePlans',
        type: [CreateDraftMedicinePlanDto]
    })
    draftMedicinePlans: CreateDraftMedicinePlanDto[];
}