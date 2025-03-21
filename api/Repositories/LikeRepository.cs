using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class LikeRepository(ApplicationDbContext context) : ILikeRepository
{
    public async Task LikePost(int postId, string userId)
    {
        var post = await context.Posts.Include(p => p.Likes).FirstOrDefaultAsync(x => x.Id == postId);
        if (post == null) return;

        var userLiked = post.Likes.Any(l => l.UserId == userId);
        if (userLiked)
        {
            var likeToRemove = post.Likes.First(l => l.UserId == userId);
            post.Likes.Remove(likeToRemove);
        }
        else
        {
            post.Likes.Add(new Like { PostId = postId, UserId = userId });
        }

        await context.SaveChangesAsync();
    }

    public async Task<bool> HasUserLikedPostAsync(string userId, int postId)
    {
        return await context.Likes.AnyAsync(l => l.UserId == userId && l.PostId == postId);
    }
}