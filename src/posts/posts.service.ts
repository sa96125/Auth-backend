import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePostDto } from './dtos/\bcreate-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly posts: Repository<Post>,
  ) {}

  getAllPosts(): Promise<Post[]> {
    return this.posts.find();
  }

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.posts.create(createPostDto);
    return this.posts.save(newPost);
  }

  updatePost({ id, data }: UpdatePostDto): Promise<UpdateResult> {
    return this.posts.update(id, { ...data });
  }
}
