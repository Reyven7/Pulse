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
        public async Task<PostDto> CreatePostAsync(PostCreateDto postDto, string userId)
        {
            var post = new Post
            {
                UserId = userId,
                Content = postDto.Content,
                CreationDate = DateTime.UtcNow,
                MediaContent = [.. postDto.MediaContent.Select(m => new PostMedia { Url = m.Url, Type = m.Type })]
            };

            context.Posts.Add(post);
            await context.SaveChangesAsync();

            return mapper.Map<PostDto>(post);
        }

        public async Task<List<PostDto>> GetPostsAsync()
        {
            var posts = await context.Posts
                .Include(p => p.Comments)
                .Include(p => p.Likes)
                .Include(p => p.User)
                .Include(p => p.MediaContent)
                .ToListAsync();

            var postDtos = mapper.Map<List<PostDto>>(posts);

            foreach (var postDto in postDtos)
            {
                var user = postDto.User;
                user = new AuthorProfileDto
                {
                    Id = user.Id,
                    Username = user.Username!,
                    ProfilePictureUrl = user.ProfilePictureUrl!
                };
            }

            return postDtos;
        }

    }
}