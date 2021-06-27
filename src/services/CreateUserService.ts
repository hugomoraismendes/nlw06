import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '@repositories';
import { hash } from 'bcryptjs';

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {
    async execute(userRequest: IUserRequest) {
        if (!userRequest.email) {
            throw new Error('Incorrect email');
        }
        if (!userRequest.password) {
            throw new Error('Incorrect password');
        }

        const usersRepository = getCustomRepository(UsersRepositories);

        const userAlreadyExists = await usersRepository.findOne({
            email: userRequest.email
        });

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        userRequest.password = await hash(userRequest.password, 8);

        const user = usersRepository.create(userRequest);

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };
