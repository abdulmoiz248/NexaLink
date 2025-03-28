import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
        return req?.cookies?.Authorization || null;
      }]),
      secretOrKey: process.env.JWT_SECRET || "hahahaha", 
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload) {
      throw new UnauthorizedException("Invalid token");
    }
    return { userId: payload.userId, username: payload.username };
  }
}
