import { Controller, Get, Post, Logger, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  private readonly _logger = new Logger(AppController.name);
  private postData: string;

  constructor(private readonly appService: AppService) {}

  @Get()
  public async getPostData(): Promise<string> {
    return this.postData;
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async postHook(@Body() json: any): Promise<string> {
    this._logger.log(`...Logging json from hook ${JSON.stringify(json)}`);
    this.postData = JSON.stringify(json);
    return 'Notification arrived';
  }
}
