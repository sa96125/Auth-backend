import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from './category.entity';
export declare class Post extends CoreEntity {
    title: string;
    content?: string;
    category?: Category;
    user: User;
    userId: number;
}
