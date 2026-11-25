import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema.js';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema.js';


@Module({
  imports: [MongooseModule.forFeature([
      {
      name:User.name,
      schema : UserSchema
     },
      {
      name:RefreshToken.name,
      schema : RefreshTokenSchema
     }
  ])
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
