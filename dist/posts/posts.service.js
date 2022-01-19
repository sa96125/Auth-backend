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
const category_entity_1 = require("./entities/category.entity");
const post_entity_1 = require("./entities/post.entity");
let PostsService = class PostsService {
    constructor(posts, categories) {
        this.posts = posts;
        this.categories = categories;
    }
    async createPost(user, createPostInput) {
        try {
            const newPost = this.posts.create(createPostInput);
            newPost.user = user;
            const categoryName = createPostInput.categoryName.trim().toLowerCase();
            const categorySlug = categoryName.replace(/ /g, '-');
            let category = await this.categories.findOne({ slug: categorySlug });
            if (!category) {
                category = await this.categories.save(this.categories.create({ slug: categorySlug, name: categoryName }));
            }
            newPost.category = category;
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
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map