import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    //ignora o primeiro elemento e joga o segundo dentro da variavel
    const [, token] = authToken.split(' ');

    try {
        const { sub } = verify(token, '9364edeb7d9adad6fed9ed0438bcd32f') as IPayLoad;

        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }
}
