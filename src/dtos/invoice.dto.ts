export class MedicineFee {
    medicineName: string;

    amount: number;
}

export class InvoiceSummary {

    serviceFee: number;

    medicineFee: MedicineFee[];
}

export class InvoiceDto {

    refId: string;
    
    price: string;

    status: string;

    bank: string;

    userId: string;

    summary: InvoiceSummary;
}