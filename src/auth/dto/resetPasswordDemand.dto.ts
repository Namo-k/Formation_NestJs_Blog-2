import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class ResetPasswordDemandDto {

    @IsEmail()
    readonly email: string;
}