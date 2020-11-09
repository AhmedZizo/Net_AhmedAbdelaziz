using Microsoft.AspNetCore.Identity;

namespace Net_AhmedAbdelaziz.Entities {
  public class User:IdentityUser {
    public string Name { get; set; }
    public string LastName { get; set; }
  }
}