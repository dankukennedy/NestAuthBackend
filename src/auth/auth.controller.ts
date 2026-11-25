import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-tokens.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// POST Signup
@Post('signup') //auth/signup
 async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
 }


// POST Login
@Post('login') //auth/login
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

// POST Refresh Token
@Post('refresh')
 async refreshTokens(@Body() refreshTokenDto:RefreshTokenDto){
   return this.authService.refreshTokens(refreshTokenDto.refreshToken);
 }



// POST Logout

}
