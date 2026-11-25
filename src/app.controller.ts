import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AuthGuard } from './guards/auth.guard.js';

//@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // someProtectedRoute(@Req() req:any) {
  //   return { message: 'Accessed Resource', userId: req.userId};
  // }


  @Get()
   getHello():string {
    return this.appService.getHello();
  }
}
