using BLL.Services;
using BLL.Shared.Dtos;
using DAL.Abstractions;
using DAL.Models;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Legacy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace URLShortener.Tests.Services
{
    [TestFixture]
    public class UserServiceTests : TestBase
    {
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private UserService _userService;

        [SetUp]
        public void SetUp()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();

            _userService = new UserService(
                _unitOfWorkMock.Object,
                Mapper
            );
        }

        [Test]
        public async Task GetUserByIdAsync_ShouldReturnUser_WhenUserExists()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                UserName = "testuser",
                Email = "test@example.com",
                PhoneNumber = "1234567890",
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            _unitOfWorkMock.Setup(u => u.Users.GetByIdAsync(userId)).ReturnsAsync(user);

            // Act
            var result = await _userService.GetUserByIdAsync(userId);

            // Assert
            
            ClassicAssert.IsNotNull(result);
            ClassicAssert.AreEqual(userId, result.Id);
            ClassicAssert.AreEqual(user.UserName, result.UserName);
        }
        [Test]
        public async Task UpdateUserAsync_ShouldUpdateUserSuccessfully()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var existingUser = new User
            {
                Id = userId,
                UserName = "olduser",
                Email = "old@example.com",
                PhoneNumber = "1234567890",
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            var updateUserDto = new UpdateUserDto
            {
                UserName = "newuser",
                Email = "new@example.com",
                PhoneNumber = "0987654321",
                Role = "Admin"
            };

            _unitOfWorkMock.Setup(u => u.Users.GetByIdAsync(userId)).ReturnsAsync(existingUser);
            _unitOfWorkMock.Setup(u => u.Users.GetByUserNameOrEmailAsync(It.IsAny<string>())).ReturnsAsync((User)null);
            _unitOfWorkMock.Setup(u => u.Users.UpdateAsync(existingUser));
            _unitOfWorkMock.Setup(u => u.SaveChangesAsync()).ReturnsAsync(1);

            // Act
            var result = await _userService.UpdateUserAsync(userId, updateUserDto);

            // Assert
            ClassicAssert.IsNotNull(result);
            ClassicAssert.AreEqual(updateUserDto.UserName, result.UserName);
            ClassicAssert.AreEqual(updateUserDto.Email, result.Email);
            ClassicAssert.AreEqual(updateUserDto.PhoneNumber, result.PhoneNumber);
            ClassicAssert.AreEqual(updateUserDto.Role, result.Role);
        }
    }
}
