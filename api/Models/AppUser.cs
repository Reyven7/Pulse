using Microsoft.AspNetCore.Identity;

namespace api.Models;

public class AppUser : IdentityUser
{
    public string FullName { get; set; } = "";
    public string? Bio { get; set; }
    public string? ProfilePictureUrl { get; set; } 
    public string? CoverPictureUrl { get; set; }
    public string? Location { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public DateTime LastActive { get; set; }

    public bool IsPrivate { get; set; } = false;
    public bool IsVerified { get; set; } = false;
    public string ThemePreference { get; set; } = "dark";

    public ICollection<Post> Posts { get; set; } = [];
    public ICollection<Comment> Comments { get; set; } = [];
    public ICollection<Like> Likes { get; set; } = [];
}
