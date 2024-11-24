using BLL.Services;
using BLL.Services.Abstractions;
using BLL.Shared.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace URLShortener.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
            
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserDto updateUserDto)
        {
            
            var currentUserId = Guid.Parse(User.FindFirst("UserId").Value);
            var userRole = User.FindFirst("Role").Value;

            if (currentUserId != id && userRole != "Admin")
                return Forbid();

            try
            {
                var updatedUser = await _userService.UpdateUserAsync(id, updateUserDto);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var currentUserId = Guid.Parse(User.FindFirst("UserId").Value);
            var userRole = User.FindFirst("Role").Value;

            if (currentUserId != id && userRole != "Admin")
                return Forbid();

            var result = await _userService.DeleteUserAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
