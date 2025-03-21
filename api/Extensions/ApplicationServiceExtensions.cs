using api.Data;
using api.Interfaces;
using api.Repositories;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services,
        IConfiguration config)
    {
        services.AddControllers();
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(config.GetConnectionString("DefaultConnection")!);
        });

        services.AddScoped<IProfileRepository, ProfileRepository>();
        services.AddScoped<IPostRepository, PostRepository>();
        services.AddScoped<ILikeRepository, LikeRepository>();
        services.AddScoped<ICommentRepository, CommentRepository>();
        services.AddScoped<ITokenService, TokenService>();

        services.AddCors();

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        // services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        return services;
    }
}