import { PrescriptionDto } from "src/dtos/prescription.dto";

export const ORDER_PRESCRIPTION_TRANSACTION_CONTROL = 'ORDER PRESCRIPTION TRANSACTION CONTROL';

export interface IOrderPrescriptionTransactionControl {

    createPrescriptionRequest(createPrescriptionRequest: PrescriptionDto): Promise<PrescriptionDto>;
   
    editPrescription(editPrescriptionRequest: PrescriptionDto): Promise<PrescriptionDto>;
   
    cancelPrescription(cancelPrescriptionRequest: PrescriptionDto): Promise<PrescriptionDto>;
   
    confirmPrescription(confirmedPrescriptionRequest: PrescriptionDto): Promise<PrescriptionDto>;
   
   }