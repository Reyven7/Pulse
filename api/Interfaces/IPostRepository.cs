using api.DTOs;

namespace api.Interfaces;

public interface IPostRepository
{
    Task<PostDto> CreatePostAsync(PostCreateDto postDto);
    Task<List<PostDto>> GetPostsAsync(int page, int pageSize, string? sortBy);
    Task<List<PostDto>> GetPostsByUsernameAsync(string username);
    Task<PostDto> GetPostByIdAsync(int id);
    Task<PostDto?> DeletePostAsync(int id);
}