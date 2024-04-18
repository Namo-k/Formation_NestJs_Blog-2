import {Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {Request} from "express";
import {CreateCommentDto} from "./dto/createComment.dto";
import {AuthGuard} from "@nestjs/passport";
import {UpdatePostDto} from "../post/dto/updatePost.dto";
import {UpdateCommentDto} from "./dto/updateComment.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post("create")
    create(@Req() req : Request, @Body() createCommentDto : CreateCommentDto) {
        const userId = req.user["userId"];
        return this.commentService.create(userId, createCommentDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete ("delete/:id")
    delete(@Req() req : Request, @Param("id", ParseIntPipe) commentId : number, @Body("postId") postId : number) {
        const userId = req.user["userId"];
        return this.commentService.delete(commentId, userId, postId);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put("update/:id")
    update(@Req() req : Request, @Param("id", ParseIntPipe) commentId : number, @Body() updateCommentDto : UpdateCommentDto){
        const userId = req.user["userId"];
        return this.commentService.update(commentId,userId,updateCommentDto)
    }
}
