import { Post } from '../entities/post.entity';
declare const CreatePostDto_base: import("@nestjs/common").Type<Omit<Post, "id">>;
export declare class CreatePostDto extends CreatePostDto_base {
}
export {};
