import { User } from 'src/users/entities/user.entity';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
export declare class PostsResolver {
    private readonly postService;
    constructor(postService: PostsService);
    createPost(authUser: User, createPostInput: CreatePostInput): Promise<CreatePostOutput>;
}
