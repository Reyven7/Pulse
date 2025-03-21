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

        dto.UserId = userId;

        var post = await repository.CreatePostAsync(dto);

        return Ok(post);
    }

    [HttpGet]
    public async Task<IActionResult> GetPostsAsync(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? sortBy = "createdAt")
    {

        var posts = await repository.GetPostsAsync(page, pageSize, sortBy);

        return Ok(posts);
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetPostAsync(string username)
    {
        var post = await repository.GetPostsAsync(username);

        if (post == null) return NotFound();

        return Ok(post);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeletePost(int id)
    {
        var deletedPost = await repository.DeletePostAsync(id);
        if (deletedPost == null)
            return NotFound();

        return Ok(deletedPost);
    }
}