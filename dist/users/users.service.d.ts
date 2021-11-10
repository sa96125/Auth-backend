import { Repository } from 'typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { Post } from 'src/posts/entities/post.entity';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
export declare class UsersService {
    private readonly users;
    private readonly verifications;
    private readonly posts;
    private readonly jwtService;
    constructor(users: Repository<User>, verifications: Repository<Verification>, posts: Repository<Post>, jwtService: JwtService);
    createAccount({ email, password, role, }: CreateAccountInput): Promise<CreateAccountOutput>;
    login({ email, password, }: LoginInput): Promise<LoginOutput>;
    findById(id: number): Promise<UserProfileOutput>;
    editProfile(userId: number, { email, password }: EditProfileInput): Promise<EditProfileOutput>;
    verifyEmail(code: string): Promise<VerifyEmailOutput>;
}
