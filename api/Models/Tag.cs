namespace api.Models;

public class Tag
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection<Post> Posts { get; set; } = [];
}