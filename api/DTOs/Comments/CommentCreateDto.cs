using System.ComponentModel.DataAnnotations;

namespace api.DTOs.Comments;

public class CommentCreateDto
{
    [Required]
    public int PostId { get; set; }
    [Required]
    public string UserId { get; set; } = null!;
    [Required]
    public string? Content { get; set; }
}