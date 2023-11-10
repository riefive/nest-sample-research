import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
