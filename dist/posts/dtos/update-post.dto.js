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
exports.UpdatePostDto = exports.UpdatePostDataType = void 0;
const graphql_1 = require("@nestjs/graphql");
const _create_post_dto_1 = require("./\bcreate-post.dto");
let UpdatePostDataType = class UpdatePostDataType extends (0, graphql_1.PartialType)(_create_post_dto_1.CreatePostDto) {
};
UpdatePostDataType = __decorate([
    (0, graphql_1.InputType)()
], UpdatePostDataType);
exports.UpdatePostDataType = UpdatePostDataType;
let UpdatePostDto = class UpdatePostDto {
};
__decorate([
    (0, graphql_1.Field)((type) => Number),
    __metadata("design:type", Number)
], UpdatePostDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => UpdatePostDataType),
    __metadata("design:type", UpdatePostDataType)
], UpdatePostDto.prototype, "data", void 0);
UpdatePostDto = __decorate([
    (0, graphql_1.ArgsType)()
], UpdatePostDto);
exports.UpdatePostDto = UpdatePostDto;
//# sourceMappingURL=update-post.dto.js.map