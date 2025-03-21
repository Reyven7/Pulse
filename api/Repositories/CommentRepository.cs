using api.Data;
using api.DTOs.Comments;
using api.Interfaces;
using api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class CommentRepository(ApplicationDbContext context, IMapper mapper) : ICommentRepository
{
    public async Task<List<CommentDto>> GetCommentsByIdAsync(int postId)
    {
        var comments = await context.Comments
            .Where(c => c.PostId == postId)
            .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
            .ToListAsync();

        return comments;
    }

    public async Task<CommentDto> CreateCommentAsync(CommentCreateDto createDto)
    {
        var comment = new Comment
        {
            PostId = createDto.PostId,
            UserId = createDto.UserId,
            Content = createDto.Content!,
            CreationDate = DateTime.UtcNow,
        };

        context.Comments.Add(comment);
        await context.SaveChangesAsync();

        return mapper.Map<CommentDto>(comment);

    }
}