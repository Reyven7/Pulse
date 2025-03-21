namespace api.DTOs.Comments;

public class CommentDto
{
    public int Id { get; set; }
    public string? Content { get; set; }
    public DateTime CreationDate { get; set; }
    public AuthorProfileDto User { get; set; } = null!;

}