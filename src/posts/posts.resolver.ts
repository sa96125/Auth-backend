import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  @Query((returns) => [Post])
  async posts(): Promise<Post[]> {
    return await this.postService.getAllPosts();
  }

  @Mutation((returns) => Boolean)
  async createPost(@Args('data') data: CreatePostDto): Promise<boolean> {
    try {
      await this.postService.createPost(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updatePost(@Args() data: UpdatePostDto): Promise<boolean> {
    try {
      await this.postService.updatePost(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
