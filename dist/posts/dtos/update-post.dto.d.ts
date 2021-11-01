import { CreatePostDto } from './\bcreate-post.dto';
declare const UpdatePostDataType_base: import("@nestjs/common").Type<Partial<CreatePostDto>>;
export declare class UpdatePostDataType extends UpdatePostDataType_base {
}
export declare class UpdatePostDto {
    id: number;
    data: UpdatePostDataType;
}
export {};
