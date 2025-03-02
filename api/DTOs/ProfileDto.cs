namespace api.DTOs;

public class ProfileDto
{
    public required string Username { get; set; }
    public string FullName { get; set; } = "";
    public string? Bio { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string? CoverPictureUrl { get; set; }
    public string? Location { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public DateTime LastActive { get; set; }

    public bool IsPrivate { get; set; } = false;
    public bool IsVerified { get; set; } = false;
}