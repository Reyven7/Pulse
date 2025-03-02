using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Authorize]
[Route("api/profile")]
public class ProfileController(IProfileRepository repository) : ControllerBase
{
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile([FromRoute] string username)
    {
        var userProfile = await repository.GetProfile(username);

        if (userProfile is null) return NotFound();

        return Ok(userProfile);
    }
}