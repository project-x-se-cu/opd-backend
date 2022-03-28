import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicineModule } from './medicine/medicine.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://opd:opdsdd@cluster0.2soll.mongodb.net/opd?retryWrites=true&w=majority'), MedicineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
