export declare class MailerService {
    private transporteur;
    sendSignupConfirmation(userEmail: string): Promise<void>;
    sendResetPassword(userEmail: string, url: string, code: string): Promise<void>;
}
