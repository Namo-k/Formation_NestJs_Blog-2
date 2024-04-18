import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {ConfigService} from "@nestjs/config";
import {config} from "rxjs";
import {PrismaService} from "src/prima/prisma.service"

type Payload = {
    sub : number,
    email : string
}

@Injectable()
export class JwTStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService, private readonly prismaService : PrismaService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get('SECRET_KEY'),
            ignoreExpiration : false,
        })
    }

    async validate(payload : Payload ){
        const user  = await this.prismaService.user.findUnique({where : {email : payload.email}})
        if(!user) throw new UnauthorizedException("Unauthorized user");
        Reflect.deleteProperty(user, "password")
        console.log(user)
        return user
    }
}