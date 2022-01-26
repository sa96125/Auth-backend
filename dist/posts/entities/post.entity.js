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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const core_entity_1 = require("../../common/entities/core.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
let Post = class Post extends core_entity_1.CoreEntity {
};
__decorate([
    (0, graphql_1.Field)((returns) => String),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 10),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)((returns) => String, { nullable: true }),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 100),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)((returns) => category_entity_1.Category, { nullable: true }),
    (0, typeorm_1.ManyToOne)((type) => category_entity_1.Category, (category) => category.posts, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", category_entity_1.Category)
], Post.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)((returns) => user_entity_1.User),
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.posts, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.RelationId)((post) => post.user),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
Post = __decorate([
    (0, graphql_1.InputType)('PostInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map