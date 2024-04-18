import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class SigninDto{

    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 50)
    readonly password: string;

}