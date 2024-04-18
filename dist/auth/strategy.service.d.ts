import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prima/prisma.service";
type Payload = {
    sub: number;
    email: string;
};
declare const JwTStrategy_base: new (...args: any[]) => Strategy;
export declare class JwTStrategy extends JwTStrategy_base {
    private readonly prismaService;
    constructor(configService: ConfigService, prismaService: PrismaService);
    validate(payload: Payload): Promise<{
        userId: number;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updateAt: Date;
    }>;
}
export {};
