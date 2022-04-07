export class MedicinePlanDto {

  _id: string;
  
  medicineName: string;

  amount: number;

  dosage: number;

  dosageTimes: string[];

  dosageMeals: string[];

  remark: string;

  status: string;

  prescriptionId: string;
}