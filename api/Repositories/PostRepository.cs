using api.Data;
using api.DTOs;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class PostRepository(ApplicationDbContext context, IMapper mapper) : IPostRepository
    {
        public async Task<PostDto> CreatePostAsync(PostCreateDto postDto)
        {
            var post = new Post
            {
                UserId = postDto.UserId,
                Content = postDto.Content,
                CreationDate = DateTime.UtcNow,
                MediaContent = [.. postDto.MediaContent.Select(m => new PostMedia { Url = m.Url, Type = m.Type })]
            };

            context.Posts.Add(post);
            await context.SaveChangesAsync();

            return mapper.Map<PostDto>(post);
        }

        public async Task<PostDto?> DeletePostAsync(int id)
        {
            var post = await context.Posts.FirstOrDefaultAsync(x => x.Id == id);
            if (post == null) return null;

            context.Posts.Remove(post);
            await context.SaveChangesAsync();

            return mapper.Map<PostDto>(post);
        }

        public async Task<List<PostDto>> GetPostsAsync(string username)
        {
            var post = await context.Posts
                .Include(p => p.Comments)
                .Include(p => p.Likes)
                .Include(p => p.User)
                .Include(p => p.MediaContent)
                .Where(p => p.User.UserName == username).ToListAsync();

            return mapper.Map<List<PostDto>>(post);
        }

        public async Task<List<PostDto>> GetPostsAsync(int page, int pageSize, string? sortBy)
        {
            var query = context.Posts
                .Include(p => p.Comments)
                .Include(p => p.Likes)
                .Include(p => p.User)
                .Include(p => p.MediaContent)
                .AsQueryable();

            // Динамічне сортування
            query = sortBy?.ToLower() switch
            {
                "likes" => query.OrderByDescending(p => p.Likes.Count),
                "comments" => query.OrderByDescending(p => p.Comments.Count),
                "createdat" => query.OrderByDescending(p => p.CreationDate),
                _ => query.OrderByDescending(p => p.CreationDate)
            };

            // Пагінація
            query = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            var posts = await query.ToListAsync();
            return mapper.Map<List<PostDto>>(posts);
        }


    }
}