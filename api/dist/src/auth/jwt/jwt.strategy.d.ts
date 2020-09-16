import { Strategy } from "passport-jwt";
import { IPayload } from "./Jwt";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: IPayload): Promise<{
        user_id: number;
        email: string;
    }>;
}
export {};
