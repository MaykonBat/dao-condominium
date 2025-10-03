import { Request, Response, NextFunction } from "express";
import { LoginData } from "../controllers/authController";
import { Profile } from "../models/resident";

export function onlyManager(req: Request, res: Response, next: NextFunction) {
    if(!res.locals.token) {
        res.sendStatus(403);
        return;
    }

    const loginData = res.locals.token as LoginData & { profile: Profile };

    if(loginData.profile === Profile.MANAGER)
        next();
    else
        res.sendStatus(403);
}


export function onlyCounselor(req: Request, res: Response, next: NextFunction) {
    if(!res.locals.token) {
        res.sendStatus(403);
        return;
    }

    const loginData = res.locals.token as LoginData & { profile: Profile };

    if(loginData.profile !== Profile.RESIDENT)
        next();
    else
        res.sendStatus(403);
}