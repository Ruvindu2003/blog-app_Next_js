import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createPostDto: any, @Request() req) {
        return this.postsService.create(createPostDto, req.user);
    }

    @Get()
    findAll(@Query() query) {
        return this.postsService.findAll(query);
    }

    @Get('my/all')
    @UseGuards(AuthGuard('jwt'))
    findMyPosts(@Request() req) {
        return this.postsService.findMyPosts(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: string, @Body() updatePostDto: any, @Request() req) {
        return this.postsService.update(+id, updatePostDto, req.user.userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: string, @Request() req) {
        return this.postsService.remove(+id, req.user.userId);
    }
}
