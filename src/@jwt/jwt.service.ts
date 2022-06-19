import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}
  sign({ id }): string {
    return jwt.sign(id, this.configService.get('SECRET_KEY'));
  }
  verify(token: string) {
    return jwt.verify(token, this.configService.get('SECRET_KEY'));
  }
}
