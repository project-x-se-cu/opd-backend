export class MedicinePlanDto {

  _id: string;
  
  medicineName: string;

  orderAmount: number;

  dosage: number;

  timesOfDay: string[];

  meals: string[];

  remark: string;

  status: string;

  prescriptionId: string;
}