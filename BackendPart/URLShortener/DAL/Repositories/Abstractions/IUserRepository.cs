using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Abstractions
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> GetByUserNameOrEmailAsync(string userNameOrEmail);
    }
}
