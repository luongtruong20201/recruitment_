import { authenticator, totp } from 'otplib';

export const generateOtpSecret = () => authenticator.generateSecret();

export const generateOtp = (
  optSecret: string,
  {
    step = 600,
    window = 1,
    epoch = Date.now(),
  }: { step: number; window: number; epoch: number },
) => {
  totp.options = { step, window, epoch };
  return totp.generate(optSecret);
};

export const verifyOtp = (otp: string, otpSecret: string) => {
  return totp.verify({ secret: otpSecret, token: otp });
};
