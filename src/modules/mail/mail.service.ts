import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerification(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Verification Email`,
      text: `Verification Email`,
      html: `Your verification url is <b>${url}</b>`,
    });
  }

  async sendForgotPasswordVerificationUrl(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Forgot Password Email`,
      text: `Forgot Password Email`,
      html: `Your Forgot Password url is <b>${url}</b>`,
    });
  }

  async sendNewJob(email: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: `New Job`,
      text: 'New Job',
      html: `new job`,
    });
  }
}
