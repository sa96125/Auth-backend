"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_service_1 = require("../jwt/jwt.service");
const user_entity_1 = require("./entities/user.entity");
const verification_entity_1 = require("./entities/verification.entity");
const post_entity_1 = require("../posts/entities/post.entity");
let UsersService = class UsersService {
    constructor(users, verifications, posts, jwtService) {
        this.users = users;
        this.verifications = verifications;
        this.posts = posts;
        this.jwtService = jwtService;
    }
    async createAccount({ email, password, role, }) {
        try {
            const exist = await this.users.findOne({ email });
            if (exist) {
                return { ok: false, error: 'there is a user with that email already' };
            }
            const user = await this.users.save(this.users.create({ email, password, role }));
            await this.verifications.save(this.verifications.create({ user }));
            return {
                ok: true,
            };
        }
        catch (error) {
            return { ok: false, error: "can't create user." };
        }
    }
    async login({ email, password }) {
        try {
            const user = await this.users.findOne({ email }, { select: ['password', 'id'] });
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
        }
        catch (error) {
            return {
                ok: false,
                error,
            };
        }
    }
    async findById(id) {
        try {
            const user = await this.users.findOne(id);
            if (user) {
                return {
                    ok: true,
                    user: user,
                };
            }
        }
        catch (error) {
            return {
                ok: false,
                error: 'User not found',
            };
        }
    }
    async editProfile(userId, { email, password }) {
        try {
            const user = await this.users.findOne(userId);
            if (email) {
                user.email = email;
                user.verified = false;
                await this.verifications.save(this.verifications.create({ user }));
            }
            if (password) {
                user.password = password;
            }
            await this.users.save(user);
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error: 'Could not update profile' };
        }
    }
    async verifyEmail(code) {
        try {
            const verification = await this.verifications.findOne({ code }, { relations: ['user'] });
            if (verification) {
                verification.user.verified = true;
                await this.users.save(verification.user);
                await this.verifications.delete(verification.id);
                return { ok: true };
            }
            return { ok: false, error: 'Vertification is not found.' };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(verification_entity_1.Verification)),
    __param(2, (0, typeorm_2.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_service_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map