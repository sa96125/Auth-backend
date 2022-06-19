import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CategoryResolver, PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { CategoryRepository } from './repositories/category.repository';

// type ORM의 data mapper를 사용한 레포지토리를 생성, p
@Module({
  imports: [TypeOrmModule.forFeature([Post, CategoryRepository])],
  // 여기 등록해야 각 클래스에서 서로의 기능을 사용할 수 있다.
  providers: [PostsResolver, PostsService, CategoryResolver],
})
export class PostsModule {}
