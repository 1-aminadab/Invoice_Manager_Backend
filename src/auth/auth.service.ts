import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';

export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {

    }
    hashData(data:string){
        return bcrypt.hash(data, 10)
    }
    async getToken(userId:number, email:string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                sub: userId,
                email
               },
               {
                expiresIn: 60 * 15,
                secret:"at-secret"
               }
            
            ),
            this.jwtService.signAsync(
                {
                sub: userId,
                email
               },
               {
                expiresIn: 60 * 60 * 24 * 7,
                secret:"rt-secret"
               }
            
            )
        ])

        return {
            access_token:accessToken,
            refresh_token: refreshToken
        }
      
    }
    async signupLocal(dto:AuthDto):Promise<Tokens>{
       
        const hash  = await this.hashData(dto.password)
        const newUser = await this.prisma.user.create({
            data:{
                email:dto.email,
                hash
            }
        })
     

        const tokens = await this.getToken(newUser.id, newUser.email)
        return tokens
    }
    async singinLocal(){}
    async logout(){}
    async refreshTokens(){}

}
