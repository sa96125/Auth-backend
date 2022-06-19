import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from '../common/common.constants';
import {
  EmailVariable,
  MailModuleOptions,
} from './interfaces/mail-module.options.interface';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  // 서버에서 http 요청 보내기.
  private async sendEmail(
    template: string,
    subject: string,
    emailVariables: EmailVariable[],
    to: string,
  ) {
    const form = new FormData();
    form.append('template', template);
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', 'sa96125@gmail.com');
    form.append('subject', subject);
    emailVariables.forEach((emailVariable) =>
      form.append(`v:${emailVariable.key}`, emailVariable.value),
    );

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        method: 'POST',
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string, to: string) {
    this.sendEmail(
      'verify-email',
      'Verify Your Email',
      [
        { key: 'code', value: code },
        { key: 'username', value: email },
      ],
      to,
    );
  }
}
