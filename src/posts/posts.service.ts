import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private prisma = new PrismaClient();

  async create(createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        user: createPostDto.user,
        title: createPostDto.title,
        content: createPostDto.content,
      },
    });
    return post;
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async deleteOne(id: string) {
    await this.prisma.post.delete({
      where: { id: parseInt(id) },
    });
    return { message: 'Post deleted successfully' };
  }
}
