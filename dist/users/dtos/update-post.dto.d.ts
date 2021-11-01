import { createUserDto } from './create-account.dto';
declare const UpdateUserDataType_base: import("@nestjs/common").Type<Partial<createUserDto>>;
export declare class UpdateUserDataType extends UpdateUserDataType_base {
}
export declare class UpdateUserDto {
    id: number;
    data: UpdateUserDataType;
}
export {};
