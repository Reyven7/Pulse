namespace api.DTOs;

public class PostDto
{
    public int Id { get; set; }
    public string? Content { get; set; }
    public bool IsEdited { get; set; }
    public DateTime CreationDate { get; set; }

    public List<PostMediaDto> MediaContent { get; set; } = [];
    public int CommentsCount { get; set; }
    public int LikesCount { get; set; }

    public AuthorProfileDto User { get; set; } = null!;
}