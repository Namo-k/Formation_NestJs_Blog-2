import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrimaModule } from './prima/prima.module';
import { MailerModule } from './mailer/mailer.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    AuthModule,
    PrimaModule,
    MailerModule,
    PostModule,
    CommentModule,
  ]
})
export class AppModule {}
