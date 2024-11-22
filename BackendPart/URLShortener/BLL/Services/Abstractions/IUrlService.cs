using BLL.Shared.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Abstractions
{
    public interface IUrlService
    {
        Task<IEnumerable<UrlDto>> GetAllUrlsAsync();
        Task<UrlDto> GetUrlByIdAsync(Guid id);
        Task<UrlDto> CreateUrlAsync(UrlForCreationDto urlForCreationDto, Guid userId);
        Task<bool> DeleteUrlAsync(Guid id, Guid userId, string userRole);
        Task<bool> UrlExistsAsync(string originalUrl);
        Task<bool> ShortUrlExistsAsync(string shortUrl);
        Task<string> GetOriginalUrlAsync(string shortUrl);
        Task<IEnumerable<UrlDto>> GetUrlsByUserIdAsync(Guid userId);
    }
}
