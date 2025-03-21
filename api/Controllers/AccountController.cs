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
                Id = user.Id,
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var createdUser = await userManager.CreateAsync(user, registerDto.Password);
            if (!createdUser.Succeeded)
                return StatusCode(500, createdUser.Errors);

            var roleResult = await userManager.AddToRoleAsync(user, "User");
            if (!roleResult.Succeeded)
                return StatusCode(500, roleResult.Errors);

            var updatedUser = await userManager.FindByEmailAsync(user.Email);
            var token = await tokenService.CreateTokenAsync(updatedUser!);

            var cookieOption = new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                Expires = DateTime.Now.AddDays(7)
            };

            Response.Cookies.Append("AuthToken", token, cookieOption);

            return Ok(new UserDto
            {
                Id = updatedUser!.Id ?? "NoID",
                Username = updatedUser!.UserName ?? "NoUsername",
                Email = updatedUser.Email ?? "NoEmail",
                Role = await userManager.GetRolesAsync(updatedUser),
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = ex.Message,
                exception = ex.GetType().Name,
                stackTrace = ex.StackTrace
            });
        }
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
            Id = user.FindFirst(JwtRegisteredClaimNames.Sub)?.Value ?? "No id",
            Role = user.FindAll(ClaimTypes.Role)?.Select(r => r.Value).ToList() ?? [],
            ProfilePictureUrl = user.FindFirst(JwtRegisteredClaimNames.Picture)?.Value ?? "No profile picture"
        });
    }
}