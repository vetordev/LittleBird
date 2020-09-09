import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Restful do aplicativo móvel Little Bird - v1';
  }
}
