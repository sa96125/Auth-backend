import { User } from 'src/users/entities/user.entity';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edit-post.dto';
import { PostsInput, PostsOutput } from './dtos/posts.dto';
import { Category } from './entities/category.entity';
import { PostsService } from './posts.service';
export declare class PostsResolver {
    private readonly postService;
    constructor(postService: PostsService);
    createPost(authUser: User, createPostInput: CreatePostInput): Promise<CreatePostOutput>;
    editPost(authUser: User, editPostInput: EditPostInput): Promise<EditPostOutput>;
    deletePost(authUser: User, deletePostInput: DeletePostInput): Promise<DeletePostOutput>;
    posts(postsInput: PostsInput): Promise<PostsOutput>;
}
export declare class CategoryResolver {
    private readonly postService;
    constructor(postService: PostsService);
    postCount(category: Category): Promise<number>;
    allCategories(): Promise<AllCategoriesOutput>;
    category(categoryInput: CategoryInput): Promise<CategoryOutput>;
}
