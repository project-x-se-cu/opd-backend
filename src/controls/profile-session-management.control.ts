import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { VerifyOTPDto } from 'src/dtos/verify-otp.dto';
import { ProfileService } from 'src/services/profile.service';
import { compare } from 'bcrypt';
import { AWSSNSProxy } from 'src/proxies/AWSSNS.proxy';

@ApiTags('Use Case - Login')
@Controller('profile')
export class ProfileSessionManagementControl {
  constructor(
    private readonly profileService: ProfileService,
    private readonly awsSNSProxy: AWSSNSProxy,
  ) {}

  @Post('login')
  async login(@Body() loginRequest: UserLoginDto) {
    const profile = await this.profileService.findProfileByUsername(
      loginRequest,
    );
    if (!profile) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const isAuthenticated = await compare(
      loginRequest.password,
      profile.password,
    );
    if (!isAuthenticated) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { otpExpireAt, _id, otp } = await this.profileService.createOTP(
      profile._id.toString(),
    );

    this.awsSNSProxy.sendOTPEmail(otp, profile.emailAddress)
    return { otpExpireAt, _id };
  }

  @Post('otp')
  async verifyOTP(@Body() otpRequest: VerifyOTPDto) {
    const profile = await this.profileService.findProfileById(otpRequest);

    if (profile.otp === otpRequest.otp && profile.otpExpireAt > new Date()) {
      return profile;
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
