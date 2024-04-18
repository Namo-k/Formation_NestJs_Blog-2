"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prima/prisma.service");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const mailer_service_1 = require("../mailer/mailer.service");
const jwt_1 = require("@nestjs/jwt");
const speakeasy = require("speakeasy");
let AuthService = class AuthService {
    constructor(prismaService, mailerService, JwtService, configService) {
        this.prismaService = prismaService;
        this.mailerService = mailerService;
        this.JwtService = JwtService;
        this.configService = configService;
    }
    async signup(signupDto) {
        const { username, email, password } = signupDto;
        const user = await this.prismaService.user.findUnique({ where: { email: signupDto.email } });
        if (user)
            throw new common_1.ConflictException("User already exists");
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.create({ data: { email, username, password: hash } });
        await this.mailerService.sendSignupConfirmation(email);
        return { data: "User successfully signed up" };
    }
    async signin(signinDto) {
        const { email, password } = signinDto;
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException("User not founds");
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new common_1.UnauthorizedException("Passwords do not match");
        const payload = {
            sub: user.userId,
            email: user.email,
        };
        const token = this.JwtService.sign(payload, {
            expiresIn: "2h",
            secret: this.configService.get("SECRET_KEY"),
        });
        return {
            token, user: {
                username: user.username,
                email: user.email,
            }
        };
    }
    async resetPasswordDemand(resetPasswordDemandDto) {
        const { email } = resetPasswordDemandDto;
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException("User not founds");
        const code = speakeasy.totp({
            secret: this.configService.get("OTP_CODE"),
            digits: 5,
            step: 60 * 15,
            encoding: "base32",
        });
        const url = "http://localhost:3000/auth/reset-password-confirmation/";
        await this.mailerService.sendResetPassword(email, url, code);
        return { data: "Reset password email has been sent" };
    }
    async resetPasswordConfirmation(resetPasswordConfirmationDto) {
        const { email, password, code } = resetPasswordConfirmationDto;
        const user = await this.prismaService.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.NotFoundException("User not founds");
        const match = speakeasy.totp.verify({
            secret: this.configService.get("OTP_CODE"),
            token: code,
            digits: 5,
            step: 60 * 15,
            encoding: "base32",
        });
        if (!match)
            throw new common_1.UnauthorizedException("Invalid/expired token");
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.user.update({ where: { email }, data: { password: hash } });
        return { data: "Password updated" };
    }
    async deleteAccount(userId, deleteAccountDto) {
        const { password } = deleteAccountDto;
        const user = await this.prismaService.user.findUnique({ where: { userId } });
        if (!user)
            throw new common_1.NotFoundException("User not founds");
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new common_1.UnauthorizedException("Passwords do not match");
        await this.prismaService.user.delete({ where: { userId } });
        return { data: "User successfully deleted" };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.MailerService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map