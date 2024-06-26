import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/entities';
import { AuthRepository } from '../../domain/repositories';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AuthRepository') private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService, 
    ) {}

    async signup(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, hashedPassword);
        return this.authRepository.create(user);
    }

    async login(username: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.authRepository.findByUsername(username);
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const accessToken = this.jwtService.sign({ username: user.username });
                return { accessToken };
            }
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
