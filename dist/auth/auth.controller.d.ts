import { SignupDto } from "./dto/signup.dto";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/signin.dto";
import { ResetPasswordDemandDto } from "./dto/resetPasswordDemand.dto";
import { ResetPasswordConfirmationDto } from "./dto/resetPasswordConfirmation.dto";
import { Request } from "express";
import { DeleteAccountDto } from "./dto/DeleteAccount.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    deleteAccount(req: Request, deleteAccountDto: DeleteAccountDto): Promise<{
        data: string;
    }>;
}
