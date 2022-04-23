import {
  Controller,
  Get,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from 'src/services/notification.service';

@ApiTags('Use Case - Issue a prescription')
@Controller('notification')
export class NotificationControl {
  constructor(private readonly notificationService: NotificationService) { }

  @Get()
  async getNotificationList(@Query('userId') userId: string) {
    return await this.notificationService.findByUserId(userId);
  }
}