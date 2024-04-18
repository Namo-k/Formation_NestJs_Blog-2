import { CommentService } from "./comment.service";
import { Request } from "express";
import { CreateCommentDto } from "./dto/createComment.dto";
import { UpdateCommentDto } from "./dto/updateComment.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(req: Request, createCommentDto: CreateCommentDto): Promise<{
        data: string;
    }>;
    delete(req: Request, commentId: number, postId: number): Promise<{
        data: string;
    }>;
    update(req: Request, commentId: number, updateCommentDto: UpdateCommentDto): Promise<{
        data: string;
    }>;
}
