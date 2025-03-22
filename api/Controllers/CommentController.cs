using System.Security.Claims;
using api.DTOs.Comments;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Authorize]
[Route("api/comment")]
public class CommentController(ICommentRepository repository) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCommentByPostId(int id)
    {
        var comments = await repository.GetCommentsByPostIdAsync(id);
        return Ok(comments);
    }

    [HttpPost]
    public async Task<IActionResult> CreateComment([FromBody] CommentCreateDto createDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null) return Unauthorized(ClaimTypes.NameIdentifier);

        createDto.UserId = userId;

        var comment = await repository.CreateCommentAsync(createDto);

        return Ok(comment);
    }
}