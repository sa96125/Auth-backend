import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/post.entity';
export declare enum UserRole {
    Mentor = "Mentor",
    Mentee = "Mentee"
}
export declare class User extends CoreEntity {
    email: string;
    password: string;
    role: UserRole;
    verified: boolean;
    posts: Post[];
    hashFunction(): Promise<void>;
    checkPassword(aPassword: string): Promise<boolean>;
}
