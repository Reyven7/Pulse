using System.Security.Claims;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/like")]
[Authorize]
public class LikeController(ILikeRepository repository) : ControllerBase
{
    [HttpGet("{postId}")]
    public async Task<IActionResult> CheckLike(int postId)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null) return Unauthorized(ClaimTypes.NameIdentifier);

        var hasLiked = await repository.HasUserLikedPostAsync(userId, postId);
        return Ok(hasLiked);
    }


    [HttpPost("{postId}")]
    public async Task<IActionResult> SetLike(int postId)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null) return Unauthorized(ClaimTypes.NameIdentifier);

        await repository.LikePost(postId, userId);

        return Ok();
    }
}