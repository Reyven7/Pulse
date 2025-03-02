using api.Data;
using api.DTOs;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace api.Repositories;

public class ProfileRepository(ApplicationDbContext context) : IProfileRepository
{

    public async Task<ProfileDto?> GetProfile(string username)
    {
        var userProfile = await context.Users
            .Where(u => u.UserName == username)
            .Select(u => new ProfileDto
            {
                Username = u.UserName!,
                FullName = u.FullName,
                Bio = u.Bio,
                ProfilePictureUrl = u.ProfilePictureUrl,
                CoverPictureUrl = u.CoverPictureUrl,
                Location = u.Location,
                DateOfBirth = u.DateOfBirth,
                LastActive = u.LastActive,
                IsPrivate = u.IsPrivate,
                IsVerified = u.IsVerified
            })
            .SingleOrDefaultAsync();

        return userProfile;
    }

}