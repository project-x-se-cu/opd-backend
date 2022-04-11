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

    summary: InvoiceSummary;
}