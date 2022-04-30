import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileEntity } from 'src/entities/profile.entity';
import { ProfileSessionManagementControl } from 'src/controls/profile-session-management.control';
import { ProfileService } from 'src/services/profile.service';
import { AWSSNSProxy } from 'src/proxies/AWSSNS.proxy';

@Module({
  providers: [ProfileService, AWSSNSProxy],
  controllers: [ProfileSessionManagementControl],
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileEntity }]),
  ],
})
export class AllUserCoordinator {}
