import { CoreEntity } from 'src/common/entities/core.entity';
declare enum UserRole {
    Mentor = 0,
    Mentee = 1
}
export declare class User extends CoreEntity {
    email: string;
    password: string;
    role: UserRole;
    hashFunction(): Promise<void>;
    checkPassword(aPassword: string): Promise<boolean>;
}
export {};
