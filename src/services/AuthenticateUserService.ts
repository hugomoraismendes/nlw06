import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '@repositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute(userRequest: IAuthenticateRequest) {
        if (!userRequest.email) {
            throw new Error('Incorrect email');
        }
        if (!userRequest.password) {
            throw new Error('Incorrect password');
        }

        const usersRepository = getCustomRepository(UsersRepositories);

        const userExist = await usersRepository.findOne({
            email: userRequest.email
        });

        if (!userExist) {
            throw new Error('Email/Password incorrect');
        }

        const passwordMatch = await compare(userRequest.password, userExist.password);

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect');
        }
        //criar uma função para gerar o hash do secret
        const token = sign({ email: userExist.email }, '9364edeb7d9adad6fed9ed0438bcd32f', {
            subject: userExist.id,
            expiresIn: '1d'
        });

        return token;
    }
}

export { AuthenticateUserService };
