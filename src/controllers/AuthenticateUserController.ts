import { Request, Response } from 'express';
import { AuthenticateUserService } from '@services';

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        const authenticateUserService = new AuthenticateUserService();
        const tag = await authenticateUserService.execute({ email, password });
        return response.json(tag);
    }
}

export { AuthenticateUserController };
