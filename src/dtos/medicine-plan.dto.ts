export class MedicinePlanDto {

  _id?: string;
  
  medicineName: string;

  properties: string;

  amount: number;

  dosage: number;

  dosageTimes: string[];

  dosageMeals: string[];

  remark: string;

  status: string;
}