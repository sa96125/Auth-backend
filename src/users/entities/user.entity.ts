import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

enum UserRole {
  Mentor,
  Mentee,
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field((returns) => String)
  @Column()
  @IsEmail()
  email: string;

  @Field((returns) => String, { nullable: true })
  @Column()
  @IsString()
  password: string;

  @Field((returns) => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashFunction(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
