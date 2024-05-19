import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('/local/signup')
    async signupLocal(@Body() dto: AuthDto):Promise<Tokens>{
        return await this.authService.signupLocal(dto)
    }

    @Post('/local/singin')
    async singinLocal(){
        await this.authService.singinLocal()
    }

    @Post('/logout')
    async logout(){
        await this.authService.logout()

    }

    @Post('/refresh')
    async refreshTokens(){
        await this.authService.refreshTokens()

    }
}
