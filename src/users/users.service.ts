import { MailService } from './../@mail/mail.service';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/@jwt/jwt.service';

import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { Post } from 'src/posts/entities/post.entity';

import { LoginInput, LoginOutput } from './dtos/login.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Post) private readonly posts: Repository<Post>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exist = await this.users.findOne({ email });
      if (exist) {
        return { ok: false, error: 'there is a user with that email already' };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );
      const verification = await this.verifications.save(
        this.verifications.create({ user }),
      );
      this.mailService.sendVerificationEmail(
        user.email,
        verification.code,
        user.email,
      );
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "can't create user." };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['password', 'id'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'there is no User.',
        };
      }

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'password is incorrect',
        };
      }

      return {
        ok: true,
        token: this.jwtService.sign({ id: user.id }),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne(id);

      if (user) {
        return {
          ok: true,
          user,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: 'User not found',
      };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        user.email = email;

        // ????????? ?????? ?????? ???????????? ????????? ??? ???????????? ????????? ????????? ????????????.
        user.verified = false;
        const verification = await this.verifications.save(
          this.verifications.create({ user }),
        );
        this.mailService.sendVerificationEmail(
          user.email,
          verification.code,
          user.email,
        );
      }
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Could not update profile' };
    }
  }

  // verifycation service??? ?????????????????? ???????????? ????????? ?????????, user??? ????????? ????????? ????????? ?????? ????????? ?????? ?????????.
  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verifications.findOne(
        { code },
        // ????????? ???????????? ????????? ?????? ????????? ??? ??????.
        { relations: ['user'] },
      );

      if (verification) {
        verification.user.verified = true;
        console.log(verification.user);
        await this.users.save(verification.user);
        await this.verifications.delete(verification.id);
        return { ok: true };
      }
      return { ok: false, error: 'Verification not found.' };
    } catch (error) {
      return { ok: false, error: 'Could not verify email.' };
    }
  }
}
