using DAL.Repositories.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Abstractions
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IUrlRepository Urls { get; }

        Task<int> SaveChangesAsync();
    }
}
