import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import config, { Config } from './config/config.js'
import { ItemModule } from './item/item.module.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'NestAuthBackend',
    }),
    //  JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET') ?? 'default_secret',
    //     signOptions: { expiresIn: '1h' },
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URI') ?? 'mongodb://127.0.0.1:27017/AuthExampleDB',
    //   }),
    //   inject: [ConfigService],
    // }),
     ConfigModule.forRoot({
      isGlobal:true,
      cache: true,
      load: [config],
     }),
     JwtModule.registerAsync({
      imports:[ConfigModule],
       useFactory: async (configService: ConfigService<Config>) => ({
         secret: configService.get('jwt.secret', { infer: true }),
      }),
      global:true,
      inject:[ConfigService],
     }),
     MongooseModule.forRootAsync({
      imports:[ConfigModule],
       useFactory: async (configService: ConfigService<Config>) =>({
         uri: configService.get('database.connectionString',{ infer:true })
      }),
       inject: [ConfigService],
     }),
    AuthModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
