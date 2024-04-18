"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailerService = class MailerService {
    async transporteur() {
        const testAccount = await nodemailer.createTestAccount();
        const transport = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            ignoreTLS: true,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        return transport;
    }
    async sendSignupConfirmation(userEmail) {
        (await this.transporteur()).sendMail({
            from: "app@gmail.com",
            to: userEmail,
            subject: "Sign up",
            html: "<h3>Confirmation d'inscription<h3>"
        });
    }
    async sendResetPassword(userEmail, url, code) {
        (await this.transporteur()).sendMail({
            from: "app@gmail.com",
            to: userEmail,
            subject: "Reset Password",
            html: `
                <a href="${url}">Reset password</a>
                <p>Secret code : <strong>${code}</strong></p>
                <p>Code expire dans 15 minutes</p>
            `
        });
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)()
], MailerService);
//# sourceMappingURL=mailer.service.js.map