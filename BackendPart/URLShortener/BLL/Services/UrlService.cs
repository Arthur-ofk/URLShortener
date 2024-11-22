using AutoMapper;
using BLL.Services.Abstractions;
using BLL.Shared.Dtos;
using DAL.Abstractions;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class UrlService : IUrlService
    {
        private readonly IUnitOfWork _unitOfWork;
        private const string Chars = "QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmiklop01234567890";
        private const int ShortUrlLength = 9;
        private readonly IMapper _mapper;

        public UrlService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UrlDto>> GetAllUrlsAsync()
        {
            var urls = await _unitOfWork.Urls.GetAllAsync();
            return _mapper.Map<IEnumerable<UrlDto>>(urls);
        }

        public async Task<UrlDto> GetUrlByIdAsync(Guid id)
        {
            var url = await _unitOfWork.Urls.GetByIdAsync(id);
            if (url == null)
                return null;

            return _mapper.Map<UrlDto>(url);
        }

        public async Task<UrlDto> CreateUrlAsync(UrlForCreationDto urlForCreationDto, Guid userId)
        {
            if (await UrlExistsAsync(urlForCreationDto.OriginalUrl))
                throw new Exception("Такий URL вже існує.");

            string shortUrl;
            do
            {
                shortUrl = GenerateRandomString(ShortUrlLength);
            }
            while (await ShortUrlExistsAsync(shortUrl));

            var url = _mapper.Map<Url>(urlForCreationDto);

            await _unitOfWork.Urls.AddAsync(url);
            await _unitOfWork.SaveChangesAsync();

            return new UrlDto
            {
                Id = url.Id,
                CreatedAt = url.CreatedAt,
                OriginalUrl = url.OriginalUrl,
                ShortUrl = url.ShortUrl,
                CreatedByUserId = url.CreatedByUserId
            };
        }

        public async Task<bool> DeleteUrlAsync(Guid id, Guid userId, string userRole)
        {
            var url = await _unitOfWork.Urls.GetByIdAsync(id);
            if (url == null)
                return false;

            if (userRole != "Admin" && url.CreatedByUserId != userId)
                throw new UnauthorizedAccessException("Ви не можете видалити цей URL.");

            _unitOfWork.Urls.DeleteAsync(url);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UrlExistsAsync(string originalUrl)
        {
            var urls = await _unitOfWork.Urls.FindAsync(u => u.OriginalUrl == originalUrl);
            return urls.Any();
        }

        public async Task<bool> ShortUrlExistsAsync(string shortUrl)
        {
            var url = await _unitOfWork.Urls.GetByShortUrlAsync(shortUrl);
            return url != null;
        }

        public async Task<string> GetOriginalUrlAsync(string shortUrl)
        {
            var url = await _unitOfWork.Urls.GetByShortUrlAsync(shortUrl);
            return url?.OriginalUrl;
        }

        private string GenerateRandomString(int length)
        {
            var random = new Random();
            return new string(Enumerable.Repeat(Chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public async Task<IEnumerable<UrlDto>> GetUrlsByUserIdAsync(Guid userId)
        {
            var urls = await _unitOfWork.Urls.FindAsync(u => u.CreatedByUserId == userId);
            return _mapper.Map<IEnumerable<UrlDto>>(urls);
        }
    }
}
