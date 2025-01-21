import { HookContext } from "@feathersjs/feathers";
import { BadRequest, NotAuthenticated } from "@feathersjs/errors";
import jwt from "jsonwebtoken";
export default async function requireLogin(context: HookContext) {

    if (!context.params.headers.authorization) {
        throw new NotAuthenticated("You must be logged in to access this service.");
    }

    const token = context.params.headers.authorization.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.AUTHENTICATION_SECRET) as jwt.JwtPayload;
        context.params.user = { id: decoded.sub };
    } catch (e) {
        throw new BadRequest("Invalid token");
    }


    // // @ts-ignore

    return context;
}