// posts.service.spec.ts
import { PostsService } from './posts.service';

// Crie um mock do Prisma Client
const mockPrisma = {
  post: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
    (postsService as any).prisma = mockPrisma;
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto = {
        title: 'Test Title',
        content: 'Test Content',
        user: 'Test User',
      };

      const createdPost = {
        id: 1,
        ...createPostDto,
      };

      (mockPrisma.post.create as jest.Mock).mockResolvedValue(createdPost);

      const result = await postsService.create(createPostDto);

      expect(result).toEqual(createdPost);
      expect(mockPrisma.post.create).toHaveBeenCalledWith({
        data: createPostDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const posts = [
        {
          id: 1,
          title: 'Title 1',
          content: 'Content 1',
          user: 'User 1',
        },
        {
          id: 2,
          title: 'Title 2',
          content: 'Content 2',
          user: 'User 2',
        },
      ];

      (mockPrisma.post.findMany as jest.Mock).mockResolvedValue(posts);

      const result = await postsService.findAll();

      expect(result).toEqual(posts);
      expect(mockPrisma.post.findMany).toHaveBeenCalled();
    });
  });
});
