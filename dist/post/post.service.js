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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prima/prisma.service");
let PostService = class PostService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        return this.prismaService.post.findMany({
            include: {
                user: {
                    select: {
                        username: true,
                        email: true,
                        password: false,
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                email: true,
                                password: false,
                            }
                        }
                    }
                }
            }
        });
    }
    async create(createPostDto, userId) {
        const { title, body } = createPostDto;
        await this.prismaService.post.create({ data: { title, body, userId } });
        return { data: "Post created successfully." };
    }
    async delete(postId, userId) {
        const post = await this.prismaService.post.findUnique({ where: { postId: postId } });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        if (post.userId !== userId)
            throw new common_1.ForbiddenException("Forbidden");
        await this.prismaService.post.delete({ where: { postId: postId } });
        return { data: "Post deleted successfully." };
    }
    async update(postId, updatePostDto, userId) {
        const post = await this.prismaService.post.findUnique({ where: { postId: postId } });
        if (!post)
            throw new common_1.NotFoundException("Post not found");
        if (post.userId !== userId)
            throw new common_1.ForbiddenException("Forbidden");
        await this.prismaService.post.update({ where: { postId }, data: { ...updatePostDto } });
        return { data: "Post updated successfully." };
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map