import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((type) => [User])
  getAllUsers(): User[] {
    return [];
  }

  @Mutation((type) => CreateAccountOutput)
  createAccount(@Args('data') data: CreateAccountInput) {
    try {
    } catch (error) {}
  }
}
