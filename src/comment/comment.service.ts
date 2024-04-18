import {ForbiddenException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateCommentDto} from "./dto/createComment.dto";
import {PrismaService} from "../prima/prisma.service";
import {UpdateCommentDto} from "./dto/updateComment.dto";

@Injectable()
export class CommentService {

    constructor(private readonly prismaService: PrismaService) {}

    async create(userId: number, createCommentDto: CreateCommentDto) {

        const {postId, content} = createCommentDto;
        const post = await this.prismaService.post.findUnique({where: {postId}});

        if(!post) throw new NotFoundException("Post not found");
        await this.prismaService.comment.create({
            data : {content,userId,postId}
        });

        return {data : "Comment created successfully."};
    }

    async delete(commentId: number, userId: any, postId: number) {

        const comment = await this.prismaService.comment.findUnique({where: {commentId}});
        if(!comment) throw new NotFoundException("Comment not found");
        if(comment.postId !== postId) throw new UnauthorizedException("PostId does not match");
        if(comment.userId !== userId) throw new ForbiddenException("Forbidden");

        await this.prismaService.comment.delete({where: {commentId}});
        return {data : "Post deleted successfully."};

    }

    async update(commentId: number, userId: any, updateCommentDto: UpdateCommentDto) {

        const {postId, content} = updateCommentDto;

        const comment = await this.prismaService.comment.findUnique({where: {commentId}});
        if(!comment) throw new NotFoundException("Comment not found");
        if(comment.postId !== postId) throw new UnauthorizedException("PostId does not match");
        if(comment.userId !== userId) throw new ForbiddenException("Forbidden");

        await this.prismaService.comment.update({where: {commentId}, data : {content}} );
        return {data : "Comment updated successfully."};
    }
}
