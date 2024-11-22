using BLL.Shared.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Abstractions
{
    public interface IUserService
    {
        Task<UserDto> GetUserByIdAsync(Guid id);
        Task<UserDto> GetUserByUserNameOrEmailAsync(string userNameOrEmail);
        Task<bool> UserExistsAsync(string userNameOrEmail);
        Task<UserDto> UpdateUserAsync(Guid id, UpdateUserDto updateUserDto);
        Task<bool> DeleteUserAsync(Guid id);
    }
}
