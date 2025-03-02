using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class PostCreateDto
    {
        [Required]
        public string? Content { get; set; }
        public List<PostMediaDto> MediaContent { get; set; } = [];
    }
}