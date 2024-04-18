import { SignupDto } from "./dto/signup.dto";
import { PrismaService } from "../prima/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "../mailer/mailer.service";
import { SigninDto } from "./dto/signin.dto";
import { JwtService } from "@nestjs/jwt";
import { ResetPasswordDemandDto } from "./dto/resetPasswordDemand.dto";
import { ResetPasswordConfirmationDto } from "./dto/resetPasswordConfirmation.dto";
import { DeleteAccountDto } from "./dto/DeleteAccount.dto";
export declare class AuthService {
    private readonly prismaService;
    private readonly mailerService;
    private readonly JwtService;
    private readonly configService;
    constructor(prismaService: PrismaService, mailerService: MailerService, JwtService: JwtService, configService: ConfigService);
    signup(signupDto: SignupDto): Promise<{
        data: string;
    }>;
    signin(signinDto: SigninDto): Promise<{
        token: string;
        user: {
            username: string;
            email: string;
        };
    }>;
    resetPasswordDemand(resetPasswordDemandDto: ResetPasswordDemandDto): Promise<{
        data: string;
    }>;
    resetPasswordConfirmation(resetPasswordConfirmationDto: ResetPasswordConfirmationDto): Promise<{
        data: string;
    }>;
    deleteAccount(userId: number, deleteAccountDto: DeleteAccountDto): Promise<{
        data: string;
    }>;
}
