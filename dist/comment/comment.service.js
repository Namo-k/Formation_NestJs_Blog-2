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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prima/prisma.service");
let CommentService = class CommentService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(userId, createCommentDto) {
        const { postId, content } = createCommentDto;
        const post = await this.prismaService.post.findUnique({ where: { postId } });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        await this.prismaService.comment.create({
            data: { content, userId, postId }
        });
        return { data: "Comment created successfully." };
    }
    async delete(commentId, userId, postId) {
        const comment = await this.prismaService.comment.findUnique({ where: { commentId } });
        if (!comment)
            throw new common_1.NotFoundException("Comment not found");
        if (comment.postId !== postId)
            throw new common_1.UnauthorizedException("PostId does not match");
        if (comment.userId !== userId)
            throw new common_1.ForbiddenException("Forbidden");
        await this.prismaService.comment.delete({ where: { commentId } });
        return { data: "Post deleted successfully." };
    }
    async update(commentId, userId, updateCommentDto) {
        const { postId, content } = updateCommentDto;
        const comment = await this.prismaService.comment.findUnique({ where: { commentId } });
        if (!comment)
            throw new common_1.NotFoundException("Comment not found");
        if (comment.postId !== postId)
            throw new common_1.UnauthorizedException("PostId does not match");
        if (comment.userId !== userId)
            throw new common_1.ForbiddenException("Forbidden");
        await this.prismaService.comment.update({ where: { commentId }, data: { content } });
        return { data: "Comment updated successfully." };
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map