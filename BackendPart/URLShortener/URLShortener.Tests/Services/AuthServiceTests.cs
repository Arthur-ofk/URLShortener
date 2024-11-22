using BLL.Services.Abstractions;
using BLL.Services;
using DAL.Abstractions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using BLL.Shared.Dtos;
using DAL.Models;
using NUnit.Framework.Legacy;

namespace URLShortener.Tests.Services
{
    [TestFixture]
    public class AuthServiceTests : TestBase
    {
        private Mock<IUserService> _userServiceMock;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IConfiguration> _configurationMock;
        private AuthService _authService;

        [SetUp]
        public void SetUp()
        {
            _userServiceMock = new Mock<IUserService>();
            _unitOfWorkMock = new Mock<IUnitOfWork>();
            _configurationMock = new Mock<IConfiguration>();

            _configurationMock.Setup(c => c["Jwt:Secret"]).Returns("VerySecretKeyForMyWebApplication");

            _authService = new AuthService(
                _userServiceMock.Object,
                _unitOfWorkMock.Object,
                _configurationMock.Object,
                Mapper
            );
        }
        [Test]
        public async Task RegisterAsync_ShouldRegisterUserSuccessfully()
        {
            // Arrange
            var registerDto = new RegisterDto
            {
                UserName = "testuser",
                Email = "test@example.com",
                Password = "Password123!",
                PhoneNumber = "1234567890",
                Role = "User"
            };

            _userServiceMock.Setup(u => u.UserExistsAsync(It.IsAny<string>())).ReturnsAsync(false);
            _unitOfWorkMock.Setup(u => u.Users.AddAsync(It.IsAny<User>())).Returns(Task.CompletedTask);
            _unitOfWorkMock.Setup(u => u.SaveChangesAsync()).ReturnsAsync(1);

            // Act
            var result = await _authService.RegisterAsync(registerDto);

            // Assert
            ClassicAssert.IsNotNull(result);
            ClassicAssert.IsNotNull(result.Token);
            ClassicAssert.IsNotNull(result.User);
            ClassicAssert.AreEqual(registerDto.UserName, result.User.UserName);
            ClassicAssert.AreEqual(registerDto.Email, result.User.Email);
        }
        [Test]
        public void RegisterAsync_ShouldThrowException_WhenUserExists()
        {
            // Arrange
            var registerDto = new RegisterDto
            {
                UserName = "existinguser",
                Email = "existing@example.com",
                Password = "Password123!",
                PhoneNumber = "1234567890",
                Role = "User"
            };

            _userServiceMock.Setup(u => u.UserExistsAsync(It.IsAny<string>())).ReturnsAsync(true);

            // Act & Assert
            var ex = Assert.ThrowsAsync<Exception>(() => _authService.RegisterAsync(registerDto));
            ClassicAssert.AreEqual("Користувач з таким іменем або емейлом вже існує.", ex.Message);
        }

    }
}
