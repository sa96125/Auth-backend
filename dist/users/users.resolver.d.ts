import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly userService;
    constructor(userService: UsersService);
    getAllUsers(): User[];
    createAccount(data: CreateAccountInput): void;
}
