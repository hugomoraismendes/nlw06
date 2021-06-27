import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '@repositories';
import { classToPlain } from 'class-transformer';

class ListUserService {
    async execute() {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const users = await usersRepositories.find();

        return classToPlain(users);
    }
}

export { ListUserService };
