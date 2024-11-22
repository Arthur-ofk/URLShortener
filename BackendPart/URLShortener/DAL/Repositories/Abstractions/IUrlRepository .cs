using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Abstractions
{
    public interface IUrlRepository : IGenericRepository<Url>
    {
        Task<Url> GetByShortUrlAsync(string shortUrl);

    }
}
