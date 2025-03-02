using System.Security.Claims;
using api.DTOs;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/post")]
public class PostController(IPostRepository repository) : ControllerBase
{
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> PostAsync([FromBody] PostCreateDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null) return Unauthorized(ClaimTypes.NameIdentifier);

        var post = await repository.CreatePostAsync(dto, userId);

        return Ok(post);
    }

    [HttpGet]
    public async Task<IActionResult> GetPostsAsync()
    {
        var posts = await repository.GetPostsAsync();

        return Ok(posts);
    }
}