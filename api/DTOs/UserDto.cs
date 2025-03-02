namespace api.DTOs;

public class UserDto
{
    public required string Username { get; set; }
    public string ProfilePictureUrl { get; set; } = "";
    public required string Email { get; set; }
    public required IEnumerable<string> Role { get; set; }
}