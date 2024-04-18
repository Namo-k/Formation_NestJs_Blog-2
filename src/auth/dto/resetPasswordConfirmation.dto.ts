import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class ResetPasswordConfirmationDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly code: string;
}