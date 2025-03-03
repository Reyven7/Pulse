using api.DTOs;

namespace api.Interfaces;

public interface IPostRepository
{
    Task<PostDto> CreatePostAsync(PostCreateDto postDto, string userId);
    Task<List<PostDto>> GetPostsAsync();
    Task<List<PostDto>> GetPostsAsync(string username);
}