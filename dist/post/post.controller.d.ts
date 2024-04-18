import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/createPost.dto";
import { Request } from "express";
import { UpdatePostDto } from "./dto/updatePost.dto";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAll(): Promise<({
        user: {
            username: string;
            email: string;
        };
        comments: ({
            user: {
                username: string;
                email: string;
            };
        } & {
            commentId: number;
            content: string;
            postId: number;
            userId: number;
        })[];
    } & {
        postId: number;
        title: string;
        body: string;
        userId: number;
    })[]>;
    create(createPostDto: CreatePostDto, req: Request): Promise<{
        data: string;
    }>;
    delete(postId: number, req: Request): Promise<{
        data: string;
    }>;
    update(postId: number, updatePostDto: UpdatePostDto, req: Request): Promise<{
        data: string;
    }>;
}
