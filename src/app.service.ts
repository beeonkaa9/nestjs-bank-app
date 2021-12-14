import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Please go to localhost:{port}/documentation for Swagger documentation';
  }
}
