import { PrismaService } from "../prima/prisma.service";
import { CreatePostDto } from "./dto/createPost.dto";
import { UpdatePostDto } from "./dto/updatePost.dto";
export declare class PostService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    create(createPostDto: CreatePostDto, userId: any): Promise<{
        data: string;
    }>;
    delete(postId: number, userId: any): Promise<{
        data: string;
    }>;
    update(postId: number, updatePostDto: UpdatePostDto, userId: any): Promise<{
        data: string;
    }>;
}
