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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const category_repository_1 = require("./repositories/category.repository");
let PostsService = class PostsService {
    constructor(posts, categories) {
        this.posts = posts;
        this.categories = categories;
    }
    async createPost(user, createPostInput) {
        try {
            const newPost = this.posts.create(createPostInput);
            newPost.user = user;
            newPost.category = await this.categories.getOrCreate(createPostInput.categoryName);
            await this.posts.save(newPost);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'could not create Post',
            };
        }
    }
    async editPost(user, editPostInput) {
        try {
            const post = await this.posts.findOne(editPostInput.postId);
            if (!post) {
                return {
                    ok: false,
                    error: 'Post not found.',
                };
            }
            if (user.id !== post.userId) {
                return {
                    ok: false,
                    error: "you can't edit post that you don't own.",
                };
            }
            let category = null;
            if (editPostInput.categoryName) {
                category = await this.categories.getOrCreate(editPostInput.categoryName);
            }
            await this.posts.save([
                Object.assign(Object.assign({ id: editPostInput.postId }, editPostInput), (category && { category })),
            ]);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'could not edit Post',
            };
        }
    }
    async deletePost(user, { postId }) {
        try {
            const post = await this.posts.findOne(postId);
            if (!post) {
                return {
                    ok: false,
                    error: 'Post not found.',
                };
            }
            if (user.id !== post.userId) {
                return {
                    ok: false,
                    error: "you can't edit post that you don't own.",
                };
            }
            await this.posts.delete(postId);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'Cannot delete Post.',
            };
        }
    }
    async allCategories() {
        try {
            const categories = await this.categories.find();
            return { ok: true, categories };
        }
        catch (error) {
            return {
                ok: false,
                error: 'no Category here',
            };
        }
    }
    countPosts(category) {
        return this.posts.count({ category });
    }
    async findCategoryBySlug({ slug, page, }) {
        try {
            const category = await this.categories.findOne({ slug });
            if (!category) {
                return {
                    ok: false,
                    error: 'Category not found.',
                };
            }
            const posts = await this.posts.find({
                where: { category },
                take: 25,
                skip: (page - 1) * 25,
            });
            const totalResults = await this.countPosts(category);
            return {
                ok: true,
                posts,
                category,
                totalPages: Math.ceil(totalResults / 25),
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'Could not load Category',
            };
        }
    }
    async AllPosts({ page }) {
        try {
            const [posts, totalResults] = await this.posts.findAndCount({
                take: 25,
                skip: (page - 1) * 25,
            });
            return {
                ok: true,
                results: posts,
                totalPages: Math.ceil(totalResults / 25),
                totalResults,
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'Could not load Posts.',
            };
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_repository_1.CategoryRepository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map