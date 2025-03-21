using api.DTOs.Comments;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        public Task<List<CommentDto>> GetCommentsByIdAsync(int postId);
        public Task<CommentDto> CreateCommentAsync(CommentCreateDto createDto);
    }
}