import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CategoryResolver, PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post, CategoryRepository])],
  providers: [PostsResolver, PostsService, CategoryResolver],
})
export class PostsModule {}
