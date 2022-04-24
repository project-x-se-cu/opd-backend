import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileEntity } from 'src/entities/profile.entity';
import { ProfileSessionManagementControl } from 'src/controls/profile-session-management.control';
import { ProfileService } from 'src/services/profile.service';

@Module({
  providers: [ProfileService],
  controllers: [ProfileSessionManagementControl],
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileEntity }]),
  ],
})
export class AllUserCoordinator {}
