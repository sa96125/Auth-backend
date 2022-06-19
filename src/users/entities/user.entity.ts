/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';

export enum UserRole {
  Admin = 'Admin',
  General = 'General',
}
// 새로운 타입을 작성했다면 그라프큐엘의 필드에 사용할 수 있는 타입을 등록
registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field((returns) => String)
  @Column()
  @IsEmail()
  email: string;

  // select false는 이 모델을 인스턴스화 했을 때, 이 프로퍼티는 불러오지 않는다.
  @Field((returns) => String)
  @Column({ select: false })
  @IsString()
  password: string;

  @Field((returns) => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @Field((returns) => Boolean, { defaultValue: true })
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  verified: boolean;

  @Field((returns) => [Post])
  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  // entity 리스너(for DB)를 이용합니다. 엔티티에 이벤트를 연결하는 데코레이터
  @BeforeInsert()
  @BeforeUpdate()
  async hashFunction(): Promise<void> {
    // 패스워드가 담겨있을 때만 작동, 만약 패스워드가 담겨 있다면 기존 패스워드를 변경한다.
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
