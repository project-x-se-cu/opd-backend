import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { DraftMedicinePlanService } from '../services/draft-medicine-plan.service';
import { SearchMedicineDto } from '../dtos/search-medicine.dto';
import { PrescriptionDto } from 'src/dtos/prescription.dto';
import { PrescriptionService } from 'src/services/prescription.service';
import { ApiTags } from '@nestjs/swagger';
import { MedicinePlanService } from 'src/services/medicine-plan.service';
import { DraftMedicinePlan } from 'src/entities/draft-medicine-plan.entity';
import { MedicinePlanDto } from 'src/dtos/medicine-plan.dto';
import { InvoiceService } from 'src/services/invoice.service';
import { InvoiceDto, InvoiceSummary, MedicineFee } from 'src/dtos/invoice.dto';
import { InvoiceStatus } from 'src/enums/invoice-status.enum';
import { MedicinePlan } from 'src/entities/medicine-plan.entity';

@ApiTags('Use Case - Issue a prescription')
@Controller()
export class ManagePrescriptionControl {
  constructor(private readonly medicineService: MedicineService,
    private readonly draftMedicinePlanService: DraftMedicinePlanService,
    private readonly medicinePlanService: MedicinePlanService,
    private readonly prescriptionService: PrescriptionService,
    private readonly invoiceService: InvoiceService
  ) { }

  @Get('medicines')
  async getMedicineList(@Query() searchMedicineDto: SearchMedicineDto) {
    return await this.medicineService.findAll(searchMedicineDto.name);
  }

  @Post('prescriptions')
  async createPrescription(@Body() createPrescriptionRequest: PrescriptionDto) {
    const createdDraftMedicinePlans = await this.draftMedicinePlanService.create(createPrescriptionRequest.draftMedicinePlans);
    return this.toPrescriptionResponse(createdDraftMedicinePlans);
  }

  @Put('prescriptions')
  async editPrescription(@Body() editPrescriptionRequest: PrescriptionDto) {
    const editedDraftMedicinePlans = await this.draftMedicinePlanService.edit(editPrescriptionRequest.draftMedicinePlans);
    return this.toPrescriptionResponse(editedDraftMedicinePlans);
  }

  @Post('prescriptions/cancel')
  async cancelPrescription(@Body() cancelPrescriptionRequest: PrescriptionDto) {
    const canceledDraftMedicinePlans = await this.draftMedicinePlanService.cancel(cancelPrescriptionRequest.draftMedicinePlans);
    return this.toPrescriptionResponse(canceledDraftMedicinePlans);
  }

  @Post('prescriptions/confirm')
  async confirmPrescription(@Body() confirmedPrescriptionRequest: PrescriptionDto) {
    const createdPrescription = await this.prescriptionService.create(confirmedPrescriptionRequest);
    const draftMedicinePlans = await this.draftMedicinePlanService.delete(confirmedPrescriptionRequest.draftMedicinePlans);
    const medicinePlans = draftMedicinePlans.map(plan => 
      this.toMedicinePlan(plan));
    await this.medicinePlanService.create(medicinePlans);
    // TODO Refactor
    const invoice = new InvoiceDto();
    invoice.status = InvoiceStatus.UNPAID;
    invoice.refId = 'INVOICE#' + Math.floor(1000 + Math.random() * 9000);
    const invoiceSummary = new InvoiceSummary();
    invoiceSummary.serviceFee = 500;
    invoiceSummary.medicineFee = [];
    let totalPrice = 500;
    for (let medicinePlan of medicinePlans) {
      let medicineFee = new MedicineFee();
      medicineFee.medicineName = medicinePlan.medicineName;
      medicineFee.amount = medicinePlan.amount;
      const medicine = await this.medicineService.findAll(medicinePlan.medicineName);
      medicineFee.price = medicineFee.amount * medicine[0].price;
      invoiceSummary.medicineFee.push(medicineFee);
      totalPrice = totalPrice + medicineFee.price;
    }
    invoice.price = totalPrice;
    invoice.summary = invoiceSummary;
    await this.invoiceService.create(invoice);
    return this.toPrescriptionResponse(draftMedicinePlans, medicinePlans);
  }

  toPrescriptionResponse(draftMedicinePlans: DraftMedicinePlan[], medicinePlans: MedicinePlan[] = []): PrescriptionDto {
    const prescriptionResponse = new PrescriptionDto();
    prescriptionResponse.draftMedicinePlans = draftMedicinePlans;
    prescriptionResponse.medicinePlans = medicinePlans;
    return prescriptionResponse;
  }

  toMedicinePlan(draftMedicinePlan: DraftMedicinePlan): MedicinePlanDto {
    const medicinePlan = new MedicinePlanDto();
    medicinePlan.dosage = draftMedicinePlan.dosage;
    medicinePlan.dosageMeals = draftMedicinePlan.dosageMeals;
    medicinePlan.medicineName = draftMedicinePlan.medicineName;
    medicinePlan.amount = draftMedicinePlan.amount;
    medicinePlan.remark = draftMedicinePlan.remark;
    medicinePlan.status = draftMedicinePlan.status;
    medicinePlan.dosageTimes = draftMedicinePlan.dosageTimes;
    return medicinePlan;
  }
}