import { Injectable } from '@nestjs/common';

@Injectable()
export class AWSSNSProxy {
  sendOTPEmail(otp: string, emailAddress: string) {
    // dummy
    console.log(`OTP ${otp} with email: ${emailAddress} has been sent`);
  }
}
