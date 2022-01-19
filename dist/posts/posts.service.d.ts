import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private readonly posts;
    private readonly categories;
    constructor(posts: Repository<Post>, categories: Repository<Category>);
    createPost(user: User, createPostInput: CreatePostInput): Promise<CreatePostOutput>;
}
