using api.DTOs;
using api.DTOs.Comments;
using api.Models;
using AutoMapper;

namespace api.Helpers;

public class MappingProfile : Profile
{
  public MappingProfile()
  {
    CreateMap<Post, PostDto>()
       .ForMember(dest => dest.LikesCount, opt => opt.MapFrom(src => src.Likes.Count))
       .ForMember(dest => dest.CommentsCount, opt => opt.MapFrom(src => src.Comments.Count))
       .ForMember(dest => dest.User, opt => opt.MapFrom(src => new AuthorProfileDto
       {
         Id = src.UserId,
         Username = src.User.UserName!,
         ProfilePictureUrl = src.User.ProfilePictureUrl!,
         IsVerified = src.User.IsVerified!,
       }))
       .ReverseMap();

    CreateMap<PostCreateDto, Post>()
        .ForMember(dest => dest.MediaContent, opt => opt.MapFrom(src =>
            src.MediaContent.Select(m => new PostMedia { Url = m.Url, Type = m.Type }).ToList()));

    CreateMap<PostMedia, PostMediaDto>()
      .ForMember(dest => dest.Url, opt => opt.MapFrom(src => src.Url))
      .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type));

    CreateMap<Comment, CommentDto>()
      .ForMember(dest => dest.User, opt => opt.MapFrom(src => new AuthorProfileDto
      {
        Id = src.UserId,
        Username = src.User.UserName!,
        ProfilePictureUrl = src.User.ProfilePictureUrl!,
        IsVerified = src.User.IsVerified!,
      }))
       .ReverseMap();
  }
}