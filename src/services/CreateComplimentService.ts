import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories, UsersRepositories } from '@repositories';

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute(complimentRequest: IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepository = getCustomRepository(UsersRepositories);

        if (complimentRequest.user_receiver === complimentRequest.user_sender) {
            throw new Error('Incorret User Receiver!');
        }

        const userReceiverExists = await usersRepository.findOne({
            id: complimentRequest.user_receiver
        });

        if (!userReceiverExists) {
            throw new Error('User Receiver does not exists!');
        }

        const compliment = complimentsRepositories.create(complimentRequest);

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };
