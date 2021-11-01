import { Repository, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dtos/\bcreate-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private readonly posts;
    constructor(posts: Repository<Post>);
    getAllPosts(): Promise<Post[]>;
    createPost(createPostDto: CreatePostDto): Promise<Post>;
    updatePost({ id, data }: UpdatePostDto): Promise<UpdateResult>;
}
