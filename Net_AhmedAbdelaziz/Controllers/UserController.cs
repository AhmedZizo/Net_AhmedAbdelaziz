using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Net_AhmedAbdelaziz.Data;
using Net_AhmedAbdelaziz.Dto;
using Net_AhmedAbdelaziz.Entities;

namespace Net_AhmedAbdelaziz.Controllers {
  
  public class UserController : BaseApiController {
    public async Task<IActionResult> AddUser(
      [FromServices] UserManager<User> userManager,
      [FromBody] ModifyUserDto dto
    ) {
      var user = mapper.Map<User>(dto);

      var result = await userManager.CreateAsync(user, dto.Password);
      if (!result.Succeeded) {
        return BadRequest(result.Errors);
      }

      return Ok(mapper.Map<UserDto>(user));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditUser(
      [FromServices] UserManager<User> userManager,
      [FromRoute] string id,
      [FromBody] ModifyUserDto dto
    ) {
      var user = await userManager.FindByIdAsync(id);
      user = mapper.Map(dto, user);
      if (user == null) {
        return NotFound();
      }
      
      var result = await userManager.UpdateAsync(user);
      if (!result.Succeeded) {
        return BadRequest(result.Errors);
      }
      return Ok(mapper.Map<UserDto>(user));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(
      [FromServices] UserManager<User> userManager,
      [FromRoute] string id
    ) {
      var user = await userManager.FindByIdAsync(id);
      if (user == null) {
        return NotFound();
      }

      var result = await userManager.DeleteAsync(user);
      if (!result.Succeeded) {
        return BadRequest(result.Errors);
      }

      return Ok();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
      [FromServices] UserManager<User> userManager,
      [FromRoute] string id
    ) {
      var user = await userManager.FindByIdAsync(id);
      if (user == null) {
        return NotFound();
      }

      return Ok(mapper.Map<UserDto>(user));
    }

    [HttpGet]
    public async Task<IActionResult> Get(
      [FromServices] AppDbContext db
    ) {
      var users = await db.Users.ProjectTo<UserDto>(mapper.ConfigurationProvider).ToListAsync();
      if (users.Count ==0) {
        return NoContent();
      }
      return Ok(users);
    }
  }
}