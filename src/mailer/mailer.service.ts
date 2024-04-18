import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailerService {
    private async transporteur(){
        const testAccount = await nodemailer.createTestAccount()
        const transport = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            ignoreTLS : true,
            auth :{
                user : testAccount.user,
                pass : testAccount.pass
            }
        })
        return transport
    }

    async sendSignupConfirmation(userEmail : string){
        (await this.transporteur()).sendMail({
            from : "app@gmail.com",
            to : userEmail,
            subject: "Sign up",
            //text : "Sign up",
            html : "<h3>Confirmation d'inscription<h3>"
        });
    }

    async sendResetPassword(userEmail : string, url : string, code : string){
        (await this.transporteur()).sendMail({
            from : "app@gmail.com",
            to : userEmail,
            subject: "Reset Password",
            //text : "Sign up",
            html : `
                <a href="${url}">Reset password</a>
                <p>Secret code : <strong>${ code }</strong></p>
                <p>Code expire dans 15 minutes</p>
            `
        });
    }
}
