using api.DTOs;
using api.Interfaces;
using api.Models;
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

        var user = await userManager.FindByNameAsync(loginDto.Username);
        if (user == null) return Unauthorized("Invalid Username!");

        if (user == null || !(await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false)).Succeeded)
        {
            return Unauthorized("Invalid username or password");
        }

        return Ok(
            new UserDto
            {
                Username = user.UserName!,
                Email = user.Email!,
                Token = await tokenService.CreateTokenAsync(user),
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
                    return Ok(
                        new UserDto
                        {
                            Username = user.UserName,
                            Email = user.Email,
                            Token = await tokenService.CreateTokenAsync(user),
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
}