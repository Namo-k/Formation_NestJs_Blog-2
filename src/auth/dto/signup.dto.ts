import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SignupDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3, 50)
    readonly username: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(8, 50)
    readonly password: string;

}