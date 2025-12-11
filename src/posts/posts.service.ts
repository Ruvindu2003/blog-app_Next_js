import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) { }

    async create(createPostDto: any, user: User) {
        const post = this.postsRepository.create({
            ...createPostDto,
            user: user,
        });
        return this.postsRepository.save(post);
    }

    async findAll(query: any) {
        const qb = this.postsRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.category', 'category')
            .where('post.status = :status', { status: 'PUBLISHED' });

        if (query.categoryId) {
            qb.andWhere('post.category.id = :categoryId', { categoryId: query.categoryId });
        }

        if (query.search) {
            qb.andWhere('post.title LIKE :search', { search: `%${query.search}%` });
        }

        return qb.orderBy('post.createdAt', 'DESC').getMany();
    }

    async findMyPosts(userId: number) {
        return this.postsRepository.find({
            where: { user: { id: userId } },
            relations: ['category'],
            order: { createdAt: 'DESC' }
        });
    }

    async findOne(id: number) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['user', 'category']
        });
        if (!post) throw new NotFoundException('Post not found');
        return post;
    }

    async update(id: number, updatePostDto: any, userId: number) {
        const post = await this.findOne(id);
        if (!post.user || post.user.id !== userId) {
            throw new ForbiddenException('You can only update your own posts');
        }
        await this.postsRepository.update(id, updatePostDto);
        return this.findOne(id);
    }

    async remove(id: number, userId: number) {
        const post = await this.findOne(id);
        if (!post.user || post.user.id !== userId) {
            throw new ForbiddenException('You can only delete your own posts');
        }
        return this.postsRepository.delete(id);
    }
}
