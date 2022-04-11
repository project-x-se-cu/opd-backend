class MedicineFee {

    medicineName: string;

    amount: number
}

class Summary {

    serviceFee: number;

    medicineFee: MedicineFee[];

}

export class ServiceSummaryDto {
  
    refId: string;

    price: number
    
    status: string;

    bank?: string;

    summary: Summary;

    createdAt: Date;

    updatedAt: Date;
}