using AutoMapper;
using BLL.Services.Abstractions;
using BLL.Shared.Dtos;
using DAL.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public UserService(IUnitOfWork unitOfWork , IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<UserDto> GetUserByIdAsync(Guid id)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(id);

            if (user == null)
                return null;

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetUserByUserNameOrEmailAsync(string userNameOrEmail)
        {
            var user = await _unitOfWork.Users.GetByUserNameOrEmailAsync(userNameOrEmail);

            if (user == null)
                return null;

            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> UserExistsAsync(string userNameOrEmail)
        {
            var user = await _unitOfWork.Users.GetByUserNameOrEmailAsync(userNameOrEmail);
            return user != null;
        }
        public async Task<UserDto> UpdateUserAsync(Guid id, UpdateUserDto updateUserDto)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(id);
            if (user == null)
                throw new Exception("Користувача не знайдено.");

            if (user.UserName != updateUserDto.UserName && await _unitOfWork.Users.GetByUserNameOrEmailAsync(updateUserDto.UserName) != null)
            {
                throw new Exception("Ім'я користувача вже використовується.");
            }

            if (user.Email != updateUserDto.Email && await _unitOfWork.Users.GetByUserNameOrEmailAsync(updateUserDto.Email) != null)
            {
                throw new Exception("Email вже використовується.");
            }

            _mapper.Map(updateUserDto, user);

            _unitOfWork.Users.UpdateAsync(user);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _unitOfWork.Users.GetByIdAsync(id);
            if (user == null)
                return false;

            _unitOfWork.Users.DeleteAsync(user);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}
