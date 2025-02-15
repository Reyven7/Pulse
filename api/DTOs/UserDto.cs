namespace api.DTOs;

public class UserDto
{
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Token { get; set; }
    public required IEnumerable<string> Role { get; set; }

}