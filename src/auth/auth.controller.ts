/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import {  ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService:AuthService){}


    @Post('/local/signup')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: CreateUserDto })
    async signupLocal(@Body() dto: CreateUserDto):Promise<Tokens>{
        try {
            return await this.authService.signupLocal(dto)
  
        } catch (error) {
         throw new InternalServerErrorException(error, "internal error")   
        }
    }

    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    async singinLocal(@Body() dto:AuthDto):Promise<Tokens>{
        return await this.authService.singinLocal(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    @Post('/logout')
    async logout(@Req() req: Request) {
      const user = req.user;
      const updatedUser = await this.authService.logout(user['sub']);
      return updatedUser
    }
    @UseGuards(AuthGuard('jwt-refresh'))
    @HttpCode(HttpStatus.OK)
    @Post('/refresh')
    async refreshTokens(@Req() req:Request){
        const user = req.user
        console.log(user);
        
        return await this.authService.refreshTokens(user['sub'], user['refreshToken'])

    }
  
}
