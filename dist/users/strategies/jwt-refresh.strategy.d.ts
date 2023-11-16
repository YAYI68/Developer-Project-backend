import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt.interface';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: string;
        role: string;
    }>;
}
export {};
