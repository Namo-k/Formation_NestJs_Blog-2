import {ForbiddenException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prima/prisma.service";
import {CreatePostDto} from "./dto/createPost.dto";
import {UpdatePostDto} from "./dto/updatePost.dto";

@Injectable()
export class PostService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getAll() {
        return this.prismaService.post.findMany({
            include: {
                user: {
                    select : {
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

    async create(createPostDto: CreatePostDto, userId: any) {
        const {title, body} = createPostDto;

        await this.prismaService.post.create({data : {title, body, userId}});
        return {data : "Post created successfully."};
    }

    async delete(postId: number, userId: any) {
       const post = await this.prismaService.post.findUnique({where: {postId: postId}});
        if(!post) throw new NotFoundException("Post not found");
        if(post.userId !== userId) throw new ForbiddenException("Forbidden");
        await this.prismaService.post.delete({where: {postId: postId}});
        return {data : "Post deleted successfully."};
    }

    async update(postId: number, updatePostDto: UpdatePostDto, userId: any) {
        const post = await this.prismaService.post.findUnique({where: {postId: postId}});
        if(!post) throw new NotFoundException("Post not found");
        if(post.userId !== userId) throw new ForbiddenException("Forbidden");
        await this.prismaService.post.update({where: {postId}, data : {...updatePostDto}} );
        return {data : "Post updated successfully."};
    }
}
