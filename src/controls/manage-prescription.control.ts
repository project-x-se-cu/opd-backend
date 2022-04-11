import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { MedicineService } from '../services/medicine.service';
import { DraftMedicinePlanService } from '../services/draft-medicine-plan.service';
import { SearchMedicineDto } from '../dtos/search-medicine.dto';
import { PrescriptionDto } from 'src/dtos/prescription.dto';
import { PrescriptionService } from 'src/services/prescription.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MedicinePlanService } from 'src/services/medicine-plan.service';
import { Prescription } from 'src/entities/prescription.entity';
import { DraftMedicinePlan } from 'src/entities/draft-medicine-plan.entity';
import { MedicinePlanDto } from 'src/dtos/medicine-plan.dto';
import { PrescriptionStatus } from 'src/enums/presciption-status.enum';
import { DraftMedicincePlanStatus } from 'src/enums/draft-medicine-plan-status.enum';
import { InvoiceService } from 'src/services/invoice.service';
import { InvoiceDto, InvoiceSummary, MedicineFee } from 'src/dtos/invoice.dto';

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
    const createdPrescription = await this.prescriptionService.create();
    const createdPrescriptionId = createdPrescription._id.toString();
    const createdDraftMedicinePlans = await this.draftMedicinePlanService.create(createPrescriptionRequest.draftMedicinePlans, createdPrescriptionId);
    return this.toPrescriptionResponse(createdPrescriptionId, createdPrescription, createdDraftMedicinePlans);
  }

  @Put('prescriptions/:id')
  @ApiParam({ name: 'id', required: true })
  async editPrescription(@Param('id') id: string, @Body() editPrescriptionRequest: PrescriptionDto) {
    const editedPrescription = await this.prescriptionService.updateStatusById(id, PrescriptionStatus.EDITED);
    const editedDraftMedicinePlans = await this.draftMedicinePlanService.edit(editPrescriptionRequest.draftMedicinePlans);
    return this.toPrescriptionResponse(id, editedPrescription, editedDraftMedicinePlans);
  }

  toPrescriptionResponse(prescriptionId: string, prescription: Prescription, draftMedicinePlans: DraftMedicinePlan[]): PrescriptionDto {
    const prescriptionResponse = new PrescriptionDto();
    prescriptionResponse._id = prescriptionId;
    prescriptionResponse.status = prescription.status;
    prescriptionResponse.draftMedicinePlans = draftMedicinePlans;
    return prescriptionResponse;
  }

  @Post('prescriptions/:id/cancel')
  @ApiParam({ name: 'id', required: true })
  async cancelPrescription(@Param('id') id: string) {
    const cancelledPrescription = await this.prescriptionService.updateStatusById(id, PrescriptionStatus.CANCELLED);
    await this.draftMedicinePlanService.updateStatusByPrescriptionId(id, DraftMedicincePlanStatus.CANCELLED);
    return {
      _id: id,
      status: cancelledPrescription.status
    };
  }

  @Post('prescriptions/:id/confirm')
  @ApiParam({ name: 'id', required: true })
  async confirmPrescription(@Param('id') id: string) {
    const confirmedPrescription = await this.prescriptionService.updateStatusById(id, PrescriptionStatus.CONFIRMED);
    const draftMedicinePlans = await this.draftMedicinePlanService.findByPrescriptionId(id);
    const medicinePlans = draftMedicinePlans.map(plan => 
      this.toMedicinePlan(plan));
    await this.medicinePlanService.create(medicinePlans, id);
    const invoice = new InvoiceDto();
    invoice.status = 'UNPAID';
    // TODO generate ref id
    invoice.refId = 'INVOICE#' + Math.floor(1000 + Math.random() * 9000);
    // TODO set user id
    invoice.userId = '1';
    const invoiceSummary = new InvoiceSummary();
    // TODO
    invoiceSummary.serviceFee = 500;
    invoiceSummary.medicineFee = [];
    let totalPrice = 0;
    medicinePlans.forEach(medicinePlan => {
      let medicineFee = new MedicineFee();
      medicineFee.medicineName = medicinePlan.medicineName;
      medicineFee.amount = medicinePlan.amount;
      // TODO
      medicineFee.price = medicineFee.amount * 10;
      invoiceSummary.medicineFee.push(medicineFee);
      totalPrice = totalPrice + medicineFee.price;
    })
    invoice.price = totalPrice;
    invoice.summary = invoiceSummary;
    await this.invoiceService.create(invoice);
    return {
      _id: id,
      status: confirmedPrescription.status
    };
  }

  toMedicinePlan(draftMedicinePlan: DraftMedicinePlan): MedicinePlanDto {
    const medicinePlan = new MedicinePlanDto();
    medicinePlan.dosage = draftMedicinePlan.dosage;
    medicinePlan.dosageMeals = draftMedicinePlan.dosageMeals;
    medicinePlan.medicineName = draftMedicinePlan.medicineName;
    medicinePlan.amount = draftMedicinePlan.amount;
    medicinePlan.prescriptionId = draftMedicinePlan.prescriptionId;
    medicinePlan.remark = draftMedicinePlan.remark;
    medicinePlan.status = draftMedicinePlan.status;
    medicinePlan.dosageTimes = draftMedicinePlan.dosageTimes;
    return medicinePlan;
  }
}