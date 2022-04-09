class MedicineFee {

    medicineName: string;

    amount: number

    totalPrice: string;

}

class Summary {

    serviceFee: number;

    medicineFee: MedicineFee[];

}

export class ServiceSummaryDto {
  
    refId: string;

    amount: number
    
    status: string;

    bank?: string;

    summary: Summary;

    createdAt: Date;

    updatedAt: Date;
}