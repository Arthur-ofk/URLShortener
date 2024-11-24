using DAL.Models;
using DAL.Repositories.Abstractions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class UrlRepository : GenericRepository<Url>, IUrlRepository
    {
        public UrlRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Url> GetByShortUrlAsync(string shortUrl)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.ShortUrl == shortUrl);
        }

        
    }
}
