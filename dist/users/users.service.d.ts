import { Repository } from 'typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { Post } from 'src/posts/entities/post.entity';
import { LoginInput } from './dtos/login.dto';
import { CreateAccountInput } from './dtos/create-account.dto';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
export declare class UsersService {
    private readonly users;
    private readonly verifications;
    private readonly posts;
    private readonly jwtService;
    constructor(users: Repository<User>, verifications: Repository<Verification>, posts: Repository<Post>, jwtService: JwtService);
    createAccount({ email, password, role, }: CreateAccountInput): Promise<{
        ok: boolean;
        error?: string;
    }>;
    login({ email, password, }: LoginInput): Promise<{
        ok: boolean;
        error?: string;
        token?: string;
    }>;
    findById(id: number): Promise<User>;
    editProfile(userId: number, { email, password }: EditProfileInput): Promise<User>;
    verifyEmail(code: string): Promise<VerifyEmailOutput>;
}
