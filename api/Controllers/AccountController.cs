using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using api.DTOs;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/account")]
public class AccountController(UserManager<AppUser> userManager, ITokenService tokenService,
    SignInManager<AppUser> signInManager) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await userManager.FindByEmailAsync(loginDto.Email);
        if (user == null) return Unauthorized("Invalid Email!");

        if (user == null || !(await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false)).Succeeded)
        {
            return Unauthorized("Invalid username or password");
        }

        var token = await tokenService.CreateTokenAsync(user);

        var cookieOption = new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.None,
            Secure = true,
            Expires = DateTime.Now.AddDays(7)
        };

        Response.Cookies.Append("AuthToken", token, cookieOption);

        return Ok(
            new UserDto
            {
                Username = user.UserName!,
                Email = user.Email!,
                ProfilePictureUrl = user.ProfilePictureUrl!,
                Role = await userManager.GetRolesAsync(user)
            }
        );
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var createdUser = await userManager.CreateAsync(user, registerDto.Password);

            if (createdUser.Succeeded)
            {
                var roleResult = await userManager.AddToRoleAsync(user, "User");

                if (roleResult.Succeeded)
                {
                    var token = await tokenService.CreateTokenAsync(user);

                    var cookieOption = new CookieOptions
                    {
                        HttpOnly = true,
                        SameSite = SameSiteMode.None,
                        Secure = true,
                        Expires = DateTime.Now.AddDays(7)
                    };

                    Response.Cookies.Append("AuthToken", token, cookieOption);

                    return Ok(
                        new UserDto
                        {
                            Username = user.UserName,
                            Email = user.Email,
                            Role = await userManager.GetRolesAsync(user)
                        }
                    );
                }
                else
                {
                    return StatusCode(500, roleResult.Errors);
                }
            }
            else return StatusCode(500, createdUser.Errors);

        }
        catch (Exception ex) { return StatusCode(500, ex); }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("AuthToken");
        return Ok();
    }

    [HttpGet("checkme")]
    [Authorize]
    public IActionResult CheckAuthStatus()
    {
        var user = HttpContext.User;

        if (!user.Identity?.IsAuthenticated ?? false)
        {
            return Unauthorized();
        }

        return Ok(new UserDto
        {
            Username = user.FindFirst(ClaimTypes.GivenName)?.Value ?? "No name",
            Email = user.FindFirst(ClaimTypes.Email)?.Value ?? "No email",
            Role = user.FindAll(ClaimTypes.Role)?.Select(r => r.Value).ToList() ?? [],
            ProfilePictureUrl = user.FindFirst(JwtRegisteredClaimNames.Picture)?.Value ?? "No profile picture"
        });
    }
}