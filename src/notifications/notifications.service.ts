import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private transporter;
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}


  @Cron(CronExpression.EVERY_DAY_AT_6PM)
  async sendNotifications() {
      console.log('Sending notifications...');
      await this.mailerService.sendMail({
        to: 'eXh4r@example.com',
        from: 'eXh4r@example.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!',
        html: '<h1>Hello world!</h1>'
      });
  }
}
