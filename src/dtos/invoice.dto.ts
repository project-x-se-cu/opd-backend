export class MedicineFee {
    medicineName: string;

    amount: number;

    price: number;
}

export class InvoiceSummary {

    serviceFee: number;

    medicineFee: MedicineFee[];
}

export class InvoiceDto {

    refId: string;
    
    price: number;

    status: string;

    bank: string;

    userId: string;

    summary: InvoiceSummary;
}