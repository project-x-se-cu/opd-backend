import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { VerifyOTPDto } from 'src/dtos/verify-otp.dto';
import { Profile, ProfileDocument } from 'src/entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly model: Model<ProfileDocument>,
  ) {}

  async findProfileByUsername(loginRequest: UserLoginDto): Promise<Profile> {
    return this.model.findOne({ username: loginRequest.username });
  }

  createOTP(profileId: string): Promise<Profile> {
    const current = new Date();
    current.setMinutes(current.getMinutes() + 1);

    return this.model
      .findByIdAndUpdate(profileId, {
        $set: {
          otp: ('00000' + Math.random() * 1000).slice(-6),
          otpExpireAt: current,
        },
      })
      .exec();
  }

  findProfileById(otpRequest: VerifyOTPDto): Promise<Profile> {
    return this.model.findById(otpRequest._id).exec();
  }
}
