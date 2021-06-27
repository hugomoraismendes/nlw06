import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '@entities';

@EntityRepository(Tag)
class TagsRepositories extends Repository<Tag> {}

export { TagsRepositories };
