import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {SignupDto} from "./dto/signup.dto";
import {PrismaService} from "../prima/prisma.service";
import * as bcrypt from 'bcrypt';
import {ConfigService} from "@nestjs/config";
import {MailerService} from "../mailer/mailer.service";
import {SigninDto} from "./dto/signin.dto";
import {JwtService} from "@nestjs/jwt";
import {ResetPasswordDemandDto} from "./dto/resetPasswordDemand.dto";
import * as speakeasy from "speakeasy";
import {ResetPasswordConfirmationDto} from "./dto/resetPasswordConfirmation.dto";
import {DeleteAccountDto} from "./dto/DeleteAccount.dto";

@Injectable()
export class AuthService {

    constructor(private readonly prismaService: PrismaService,
                private readonly mailerService: MailerService,
                private readonly JwtService : JwtService,
                private readonly configService : ConfigService,
    ) {}

    async signup(signupDto: SignupDto) {

        const { username, email, password } = signupDto;

        // ** Vérifier si l'user est deja inscrit
        const user = await this.prismaService.user.findUnique({where : {email: signupDto.email}});
        if(user) throw new ConflictException("User already exists");

        // ** hasher le mdp
        const hash = await bcrypt.hash(password, 10);

        // ** Enregistrer l'user dans le bd
        await this.prismaService.user.create({data : {email, username, password : hash}})

        // ** Envoyer un mail de confirmation
        await this.mailerService.sendSignupConfirmation(email)

        // ** Retourner une rép de succes
        return {data : "User successfully signed up"}
    }

    async signin(signinDto: SigninDto) {
        const {email, password } = signinDto;

        // ** verifier si l'user est deja inscrit
        const user = await this.prismaService.user.findUnique({where: {email}});
        if(!user) throw new NotFoundException("User not founds");

        // ** comparer mdp
        const match = await bcrypt.compare(password, user.password)
        if(!match) throw new UnauthorizedException("Passwords do not match");

        // ** retourner token jwt
        const payload = {
            sub : user.userId,
            email : user.email,
        }
        const token = this.JwtService.sign(payload, {
            expiresIn: "2h",
            secret: this.configService.get("SECRET_KEY"),
        });

        return {
            token, user : {
                username : user.username,
                email : user.email,
            }
        }
    }

    async resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto) {
        const {email} = resetPasswordDemandDto;

        // ** verifier si l'user est deja inscrit
        const user = await this.prismaService.user.findUnique({where: {email}});
        if(!user) throw new NotFoundException("User not founds");

        //génération
        const code = speakeasy.totp({
            secret : this.configService.get("OTP_CODE"),
            digits : 5,
            step : 60 * 15,
            encoding : "base32",
        })

        const url = "http://localhost:3000/auth/reset-password-confirmation/";

        await this.mailerService.sendResetPassword(email, url, code)

        return {data : "Reset password email has been sent"}
    }

    async resetPasswordConfirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
        const {email, password, code} = resetPasswordConfirmationDto;

        // ** verifier si l'user est deja inscrit
        const user = await this.prismaService.user.findUnique({where: {email}});
        if(!user) throw new NotFoundException("User not founds");

        const match = speakeasy.totp.verify({
            secret : this.configService.get("OTP_CODE"),
            token : code,
            digits : 5,
            step : 60 * 15,
            encoding : "base32",
        })

        if(!match) throw new UnauthorizedException("Invalid/expired token");

        const hash = await bcrypt.hash(password, 10);

        await this.prismaService.user.update({where: {email}, data: {password: hash}});

        return {data : "Password updated"};
    }

    async deleteAccount(userId: number, deleteAccountDto: DeleteAccountDto) {
        const {password} = deleteAccountDto;

        // ** verifier si l'user est deja inscrit
        const user = await this.prismaService.user.findUnique({where: {userId}});
        if(!user) throw new NotFoundException("User not founds");

        // ** comparer mdp
        const match = await bcrypt.compare(password, user.password)
        if(!match) throw new UnauthorizedException("Passwords do not match");

        await this.prismaService.user.delete({where: {userId}});

        return {data : "User successfully deleted"};
    }
}
