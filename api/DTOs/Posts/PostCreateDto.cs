using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class PostCreateDto
    {
        public string UserId { get; set; } = null!;
        [Required]
        public string? Content { get; set; }
        public List<PostMediaDto> MediaContent { get; set; } = [];
    }
}