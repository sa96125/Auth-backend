import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
export declare class PostsResolver {
    private readonly postService;
    constructor(postService: PostsService);
    posts(): Promise<Post[]>;
    createPost(data: CreatePostDto): Promise<boolean>;
    updatePost(data: UpdatePostDto): Promise<boolean>;
}
