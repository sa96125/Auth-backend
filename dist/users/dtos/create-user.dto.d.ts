import { User } from '../entities/user.entity';
declare const createUserDto_base: import("@nestjs/common").Type<Omit<User, "id">>;
export declare class createUserDto extends createUserDto_base {
}
export {};
