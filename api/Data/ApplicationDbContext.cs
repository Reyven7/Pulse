using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class ApplicationDbContext(DbContextOptions dbContextOptions) : IdentityDbContext<AppUser>(dbContextOptions)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(
             new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
             new IdentityRole { Name = "User", NormalizedName = "USER" },
             new IdentityRole { Name = "PremiumUser", NormalizedName = "PREMIUMUSER" }
        );


    }

}