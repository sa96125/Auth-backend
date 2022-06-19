import { Args, Mutation, Parent, Query, ResolveField } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/@auth/auth-user.decorator';
import { Role } from 'src/@auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edit-post.dto';
import { PostsInput, PostsOutput } from './dtos/posts.dto';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  @Mutation((returns) => CreatePostOutput)
  @Role(['Any'])
  async createPost(
    @AuthUser() authUser: User,
    @Args('input') createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(authUser, createPostInput);
  }

  @Mutation((returns) => EditPostOutput)
  @Role(['Any'])
  async editPost(
    @AuthUser() authUser: User,
    @Args('input') editPostInput: EditPostInput,
  ): Promise<EditPostOutput> {
    return this.postService.editPost(authUser, editPostInput);
  }

  @Mutation((returns) => DeletePostOutput)
  @Role(['Any'])
  async deletePost(
    @AuthUser() authUser: User,
    @Args('input') deletePostInput: DeletePostInput,
  ): Promise<DeletePostOutput> {
    return this.postService.deletePost(authUser, deletePostInput);
  }

  @Query((returns) => PostsOutput)
  async posts(@Args('input') postsInput: PostsInput): Promise<PostsOutput> {
    return this.postService.AllPosts(postsInput);
  }
}

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private readonly postService: PostsService) {}

  // 데이터베이스에 저장되지 않는 값, 엔티티에서 호출되지 않는 값, 그냥 리졸버에서 계산해주는 값! ( 유연성 높다. )
  @ResolveField((type) => Number)
  postCount(@Parent() category: Category): Promise<number> {
    return this.postService.countPosts(category);
  }

  @Query((type) => AllCategoriesOutput)
  async allCategories(): Promise<AllCategoriesOutput> {
    return this.postService.allCategories();
  }

  @Query((type) => CategoryOutput)
  async category(
    @Args('input') categoryInput: CategoryInput,
  ): Promise<CategoryOutput> {
    return this.postService.findCategoryBySlug(categoryInput);
  }
}
