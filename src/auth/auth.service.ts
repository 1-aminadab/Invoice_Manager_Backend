/* eslint-disable prettier/prettier */
import { BadRequestException, ForbiddenException,Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async getToken(userId: number, email: string) {
        const payload = { sub: userId, email }
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: 60 * 15, secret: "at-secret" }),
            this.jwtService.signAsync(payload, { expiresIn: 60 * 60 * 24 * 7, secret: "rt-secret" })
        ])

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async signupLocal(dto: any): Promise<any> {
        console.log('====================================');
        console.log("here we go");
        console.log('====================================');
        try {
            const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
            console.log('====================================');
            console.log("is the problem here ");
            console.log('====================================');
            if (existingUser) {
                throw new BadRequestException('Email already exists.');
            }
            
            const hash = await this.hashData(dto.password)
            const newUser = await this.prisma.user.create({ data: {...dto, password:hash} });
            console.log('====================================');
            console.log("or here", newUser);
            console.log('====================================');
            const tokens = await this.getToken(newUser.user_id, newUser.email);
            await this.updateRefreshTokenHash(newUser.user_id, tokens.refresh_token);
            return {success:true, status:200, data:{access_token:tokens.access_token, refresh_token:tokens.refresh_token, user:newUser}};
        } catch (error) {
            throw new BadRequestException('Signup failed.', error.message);
        }
    }

    async singinLocal(dto: AuthDto): Promise<any> {
        console.log('====================================');
        console.log(dto);
        console.log('====================================');
        try {
            const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
            if (!user) {
                throw new ForbiddenException('Access Denied');
            }
            
            const passwordMatches = await bcrypt.compare(dto.password, user.password);
            if (!passwordMatches) {
                throw new ForbiddenException('Password does not match');
            }
            
            const tokens = await this.getToken(user.user_id, user.email);
            await this.updateRefreshTokenHash(user.user_id, tokens.refresh_token);
            console.log('====================================');
            console.log(tokens);
            console.log('====================================');
            return {success:true, status:200, data:{access_token:tokens.access_token, refresh_token:tokens.refresh_token, user:user}};
        } catch (error) {
            throw new ForbiddenException('Signin failed.', error.message);
        }
    }

    async logout(userId: number) {
        await this.prisma.user.updateMany({
            where: {
                user_id: userId,
                hashedRt: { not: null }
            },
            data: { hashedRt: null }
        });
        return { message: 'Logged out successfully.', success: true };
    }

    async refreshTokens(userId: number, refreshToken: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: { user_id: userId } });
            console.log('====================================');
            console.log(user);
            console.log('====================================');
            if (!user) {
                throw new ForbiddenException('Access denied');
            }
            
            const legalUser = await bcrypt.compare(refreshToken,user.hashedRt)
            console.log('====================================');
            console.log(legalUser);
            console.log('====================================');
            if (legalUser ) {
                throw new ForbiddenException('Access denied');
            }
           
            const tokens = await this.getToken(user.user_id, user.email);
            console.log('====================================');
            console.log(tokens);
            console.log('====================================');
            await this.updateRefreshTokenHash(user.user_id, tokens.refresh_token);
          
            return tokens;
        } catch (error) {
          
            throw new ForbiddenException('Token refresh failed.', error.message);
        }
    }

    async updateRefreshTokenHash(userId: number, refreshToken: string) {
        const hash = await this.hashData(refreshToken)
        await this.prisma.user.update({ where: { user_id: userId }, data: { hashedRt: hash } });
    }
}