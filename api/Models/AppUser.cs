using Microsoft.AspNetCore.Identity;

namespace api.Models;

public class AppUser : IdentityUser
{
    public string FullName { get; set; } = "";
    public string Bio { get; set; } = "";
    public string ProfilePictureUrl { get; set; } = "";
    public string CoverPictureUrl { get; set; } = "";
    public string Location { get; set; } = "";
    public DateTime DateOfBirth { get; set; }

    public int PostsCount { get; set; }
    public int LikesCount { get; set; }
    public int CommentsCount { get; set; }
    public DateTime LastActive { get; set; }

    public bool IsPrivate { get; set; } = false;
    public bool IsVerified { get; set; } = false;
    public string ThemePreference { get; set; } = "dark";
}
