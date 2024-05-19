import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string
}