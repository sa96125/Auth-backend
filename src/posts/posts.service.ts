import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class PostsService {
  constructor(
    // 포스트의 레포지토리를 생성, 내 DB에 엑세스.
    // 포스트 레포지토리 타입의 인스턴스 생성
    @InjectRepository(Post)
    private readonly posts: Repository<Post>,
    private readonly categories: CategoryRepository,
  ) {}

  async createPost(
    user: User,
    createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    try {
      const newPost = this.posts.create(createPostInput);
      newPost.user = user;
      newPost.category = await this.categories.getOrCreate(
        createPostInput.categoryName,
      );

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

  async editPost(
    user: User,
    editPostInput: EditPostInput,
  ): Promise<EditPostOutput> {
    try {
      const post = await this.posts.findOne(editPostInput.postId);

      if (!post) {
        return {
          ok: false,
          error: 'Post not found.',
        };
      }

      if (user.id !== post.userId) {
        return {
          ok: false,
          error: "you can't edit post that you don't own.",
        };
      }

      let category: Category = null;
      if (editPostInput.categoryName) {
        category = await this.categories.getOrCreate(
          editPostInput.categoryName,
        );
      }

      await this.posts.save([
        {
          id: editPostInput.postId,
          ...editPostInput,
          ...(category && { category }),
        },
      ]);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'could not edit Post',
      };
    }
  }

  async deletePost(
    user: User,
    { postId }: DeletePostInput,
  ): Promise<DeletePostOutput> {
    try {
      const post = await this.posts.findOne(postId);

      if (!post) {
        return {
          ok: false,
          error: 'Post not found.',
        };
      }

      if (user.id !== post.userId) {
        return {
          ok: false,
          error: "you can't edit post that you don't own.",
        };
      }

      await this.posts.delete(postId);

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot delete Post.',
      };
    }
  }

  async allCategories(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categories.find();

      return { ok: true, categories };
    } catch (error) {
      return {
        ok: false,
        error: 'no Category here',
      };
    }
  }

  countPosts(category: Category) {
    return this.posts.count({ category });
  }

  async findCategoryBySlug({
    slug,
    page,
  }: CategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categories.findOne({ slug });

      if (!category) {
        return {
          ok: false,
          error: 'Category not found.',
        };
      }

      const posts = await this.posts.find({
        where: { category },
        take: 25,
        skip: (page - 1) * 25,
      });

      const totalResults = await this.countPosts(category);

      return {
        ok: true,
        posts,
        category,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load Category',
      };
    }
  }

  async AllPosts({ page }: PostsInput): Promise<PostsOutput> {
    try {
      const [posts, totalResults] = await this.posts.findAndCount({
        take: 25,
        skip: (page - 1) * 25,
      });

      return {
        ok: true,
        results: posts,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load Posts.',
      };
    }
  }
}
