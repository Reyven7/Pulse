using api.DTOs;

namespace api.Interfaces;

public interface IProfileRepository
{
    public Task<ProfileDto?> GetProfile(string username);
}