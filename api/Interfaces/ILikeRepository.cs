namespace api.Interfaces;

public interface ILikeRepository
{
    public Task LikePost(int postId, string userId);
    public Task<bool> HasUserLikedPostAsync(string userId, int postId);
}