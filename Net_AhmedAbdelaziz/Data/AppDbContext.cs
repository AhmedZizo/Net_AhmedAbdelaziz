using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Net_AhmedAbdelaziz.Entities;

namespace Net_AhmedAbdelaziz.Data {
  public class AppDbContext:IdentityDbContext<User> {

    public AppDbContext(DbContextOptions options)
      : base(options) {
    }

    protected override void OnModelCreating(ModelBuilder builder) {
      base.OnModelCreating(builder);
      builder.Entity<User>().HasKey(u => u.Id);
    }
  }
}