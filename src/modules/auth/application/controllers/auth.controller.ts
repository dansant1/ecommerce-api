import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
    LoginDto,
    SignupDto,
} from '../dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}   

    @Post('signup')
    async signup(@Body() body: SignupDto) {
        await this.authService.signup(body.username, body.password);
        return {
            message: 'user registered',
        }
    }   

    @Post('login')
    async login(@Body() body: LoginDto) {
      return  this.authService.login(body.username, body.password);
    }
}
