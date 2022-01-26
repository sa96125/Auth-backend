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
exports.CategoryResolver = exports.PostsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const role_decorator_1 = require("../auth/role.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const all_categories_dto_1 = require("./dtos/all-categories.dto");
const category_dto_1 = require("./dtos/category.dto");
const create_post_dto_1 = require("./dtos/create-post.dto");
const delete_post_dto_1 = require("./dtos/delete-post.dto");
const edit_post_dto_1 = require("./dtos/edit-post.dto");
const posts_dto_1 = require("./dtos/posts.dto");
const category_entity_1 = require("./entities/category.entity");
const post_entity_1 = require("./entities/post.entity");
const posts_service_1 = require("./posts.service");
let PostsResolver = class PostsResolver {
    constructor(postService) {
        this.postService = postService;
    }
    async createPost(authUser, createPostInput) {
        return this.postService.createPost(authUser, createPostInput);
    }
    async editPost(authUser, editPostInput) {
        return this.postService.editPost(authUser, editPostInput);
    }
    async deletePost(authUser, deletePostInput) {
        return this.postService.deletePost(authUser, deletePostInput);
    }
    async posts(postsInput) {
        return this.postService.AllPosts(postsInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => create_post_dto_1.CreatePostOutput),
    (0, role_decorator_1.Role)(['Any']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_post_dto_1.CreatePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createPost", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => edit_post_dto_1.EditPostOutput),
    (0, role_decorator_1.Role)(['Any']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        edit_post_dto_1.EditPostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "editPost", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => delete_post_dto_1.DeletePostOutput),
    (0, role_decorator_1.Role)(['Any']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        delete_post_dto_1.DeletePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "deletePost", null);
__decorate([
    (0, graphql_1.Query)((returns) => posts_dto_1.PostsOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.PostsInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "posts", null);
PostsResolver = __decorate([
    (0, graphql_2.Resolver)((of) => post_entity_1.Post),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsResolver);
exports.PostsResolver = PostsResolver;
let CategoryResolver = class CategoryResolver {
    constructor(postService) {
        this.postService = postService;
    }
    postCount(category) {
        return this.postService.countPosts(category);
    }
    async allCategories() {
        return this.postService.allCategories();
    }
    async category(categoryInput) {
        return this.postService.findCategoryBySlug(categoryInput);
    }
};
__decorate([
    (0, graphql_1.ResolveField)((type) => Number),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_1.Category]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "postCount", null);
__decorate([
    (0, graphql_1.Query)((type) => all_categories_dto_1.AllCategoriesOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "allCategories", null);
__decorate([
    (0, graphql_1.Query)((type) => category_dto_1.CategoryOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "category", null);
CategoryResolver = __decorate([
    (0, graphql_2.Resolver)((of) => category_entity_1.Category),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], CategoryResolver);
exports.CategoryResolver = CategoryResolver;
//# sourceMappingURL=posts.resolver.js.map