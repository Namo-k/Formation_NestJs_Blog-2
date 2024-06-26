import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {JwTStrategy} from "./strategy.service";

@Module({
  imports : [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwTStrategy],
})
export class AuthModule {}
