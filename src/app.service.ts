import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      statusCode: 200,
      statusText: 'OK',
      message: 'Hello!',
    };
  }
}
