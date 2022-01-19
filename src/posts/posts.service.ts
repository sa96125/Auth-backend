import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>,
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async createPost(
    user: User,
    createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    try {
      const newPost = this.posts.create(createPostInput);
      newPost.user = user;
      const categoryName = createPostInput.categoryName.trim().toLowerCase();
      const categorySlug = categoryName.replace(/ /g, '-');
      let category = await this.categories.findOne({ slug: categorySlug });
      if (!category) {
        category = await this.categories.save(
          this.categories.create({ slug: categorySlug, name: categoryName }),
        );
      }
      newPost.category = category;

      await this.posts.save(newPost);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'could not create Post',
      };
    }
  }
}
