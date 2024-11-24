using AutoMapper;
using BLL.Services.Abstractions;
using BLL.Shared.Dtos;
using DAL.Abstractions;
using DAL.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthService(IUserService userService, IUnitOfWork unitOfWork, IConfiguration configuration,IMapper mapper)
        {
            _userService = userService;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            if (await _userService.UserExistsAsync(registerDto.UserName) || await _userService.UserExistsAsync(registerDto.Email))
            {
                throw new Exception("Користувач з таким іменем або емейлом вже існує.");
            }

            var user = _mapper.Map<User>(registerDto);

            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.SaveChangesAsync();

            var userDto = _mapper.Map<UserDto>(user);

            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                User = userDto
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _unitOfWork.Users.GetByUserNameOrEmailAsync(loginDto.UserNameOrEmail);

            if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
            {
                throw new Exception("Неправильне ім'я користувача або пароль.");
            }

            var userDto = _mapper.Map<UserDto>(user);

            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                User = userDto
            };
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSecret = _configuration["Jwt:Secret"];
            var key = Encoding.UTF8.GetBytes(jwtSecret);

            var claims = new[]
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim("UserName", user.UserName),
                new Claim("Email", user.Email),
                new Claim("Role", user.Role)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        

        private bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}
