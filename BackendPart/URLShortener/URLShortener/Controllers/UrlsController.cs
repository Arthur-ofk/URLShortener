using BLL.Services.Abstractions;
using BLL.Shared.Dtos;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace URLShortener.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlsController : ControllerBase
    {
        private readonly IUrlService _urlService;

        public UrlsController(IUrlService urlService)
        {
            _urlService = urlService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var urls = await _urlService.GetAllUrlsAsync();
            return Ok(urls);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UrlForCreationDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = Guid.Parse(User.FindFirst("UserId").Value);
            var url = await _urlService.CreateUrlAsync(model, userId);
            return Ok(url);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = Guid.Parse(User.FindFirst("UserId").Value);
            var userRole = User.FindFirst("Role").Value;

            var result = await _urlService.DeleteUrlAsync(id, userId, userRole);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("{shortUrl}")]
        public async Task<IActionResult> RedirectToOriginalUrl(string shortUrl)
        {
            var originalUrl = await _urlService.GetOriginalUrlAsync(shortUrl);
            if (originalUrl == null)
                return NotFound();

            return Redirect(originalUrl);
        }
        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetUrlsByUserId(Guid userId)
        {
            var currentUserId = Guid.Parse(User.FindFirst("UserId").Value);
            var userRole = User.FindFirst("Role").Value;

            if (currentUserId != userId && userRole != "Admin")
                return Forbid();

            var urls = await _urlService.GetUrlsByUserIdAsync(userId);
            return Ok(urls);
        }
    }
}
