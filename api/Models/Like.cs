using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Like
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; } = null!;
    public AppUser User { get; set; } = null!;

    [Required]
    public int PostId { get; set; }
    public Post Post { get; set; } = null!;
}
