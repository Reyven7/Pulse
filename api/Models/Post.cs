using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Post
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; } = null!;
    public AppUser User { get; set; } = null!;

    public string? Content { get; set; }
    public bool IsEdited { get; set; }
    public DateTime CreationDate { get; set; }

    public ICollection<PostMedia> MediaContent { get; set; } = [];

    public ICollection<Comment> Comments { get; set; } = [];
    public ICollection<Like> Likes { get; set; } = [];
    public ICollection<Tag> Tags { get; set; } = [];
}

