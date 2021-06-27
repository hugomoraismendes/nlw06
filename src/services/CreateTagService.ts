import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '@repositories';

interface ITagRequest {
    name: string;
}

class CreateTagService {
    async execute(tagRequest: ITagRequest) {
        if (!tagRequest.name) {
            throw new Error('Incorrect name');
        }
        const tagsRepository = getCustomRepository(TagsRepositories);

        const tagAlreadyExist = await tagsRepository.findOne({
            name: tagRequest.name,
        });

        if (tagAlreadyExist) {
            throw new Error('Tag already exists');
        }

        const tag = tagsRepository.create(tagRequest);

        await tagsRepository.save(tag);

        return tag;
    }
}

export { CreateTagService };
