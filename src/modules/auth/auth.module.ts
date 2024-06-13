import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './application/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { AuthRepositoryImpl } from './infrstructure/repositories';
import { UserSchema } from './infrstructure/schemas';
import {
  JwtStrategy,
} from './shared/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1h' },
        }),
    }),
  ],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule], 
  providers: [
    AuthService,
    JwtStrategy,
    {
        provide: 'AuthRepository',
        useClass: AuthRepositoryImpl,
    },
  ],
})
export class AuthModule {}
