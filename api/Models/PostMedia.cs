namespace api.Models;

public class PostMedia
{
    public int Id { get; set; }
    public int PostId { get; set; }
    public Post Post { get; set; } = null!;
    public string? Type { get; set; }
    public string Url { get; set; } = null!;
}