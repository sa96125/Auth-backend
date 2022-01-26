import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edit-post.dto';
import { PostsInput, PostsOutput } from './dtos/posts.dto';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { CategoryRepository } from './repositories/category.repository';
export declare class PostsService {
    private readonly posts;
    private readonly categories;
    constructor(posts: Repository<Post>, categories: CategoryRepository);
    createPost(user: User, createPostInput: CreatePostInput): Promise<CreatePostOutput>;
    editPost(user: User, editPostInput: EditPostInput): Promise<EditPostOutput>;
    deletePost(user: User, { postId }: DeletePostInput): Promise<DeletePostOutput>;
    allCategories(): Promise<AllCategoriesOutput>;
    countPosts(category: Category): Promise<number>;
    findCategoryBySlug({ slug, page, }: CategoryInput): Promise<CategoryOutput>;
    AllPosts({ page }: PostsInput): Promise<PostsOutput>;
}
