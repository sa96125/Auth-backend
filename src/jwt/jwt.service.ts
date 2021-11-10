import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from './interfaces/jwt-module-options.interface';
import { CONFIG_OPTIONS } from '../common/common.constants';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    private readonly configService: ConfigService,
  ) {}
  sign(payload: Record<string, unknown>): string {
    // return jwt.sign(payload, this.configService.get('SECRET_KEY'));
    return jwt.sign(payload, this.options.secretKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.secretKey);
  }
}
