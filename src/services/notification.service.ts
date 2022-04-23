import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDto } from 'src/dtos/notification-dto';
import { Notification, NotificationDocument } from 'src/entities/notification.entity';

@Injectable()
export class NotificationService {

  constructor(
    @InjectModel(Notification.name) private readonly model: Model<NotificationDocument>,
  ) { }

  async notify(notification: NotificationDto): Promise<Notification> {
    return await this.model.create(notification);
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return await this.model.find({userId: userId}).exec();
  }
}