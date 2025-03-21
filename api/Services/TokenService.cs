using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Linq;

namespace api.Services;

public class TokenService(IConfiguration config, UserManager<AppUser> userManager) : ITokenService
{
    private readonly SymmetricSecurityKey _key = new(Encoding.UTF8.GetBytes(config["JWT:SigningKey"]!));

    public async Task<string> CreateTokenAsync(AppUser appUser)
    {
        var roles = await userManager.GetRolesAsync(appUser);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Email, appUser.Email!),
            new(JwtRegisteredClaimNames.GivenName, appUser.UserName!),
            new(JwtRegisteredClaimNames.Sub, appUser.Id.ToString()),
            new(JwtRegisteredClaimNames.Picture, appUser.ProfilePictureUrl ?? "unknown")
        };
        claims.AddRange(from role in roles select new Claim(ClaimTypes.Role, role));

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds,
            Issuer = config["JWT:Issuer"],
            Audience = config["JWT:Audience"],
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}