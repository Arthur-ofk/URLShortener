using BLL.Services;
using DAL.Abstractions;
using DAL.Models;
using Moq;
using NUnit.Framework.Legacy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace URLShortener.Tests.Services
{
    [TestFixture]
    public class UrlServiceTests : TestBase
    {
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private UrlService _urlService;

        [SetUp]
        public void SetUp()
        {
            _unitOfWorkMock = new Mock<IUnitOfWork>();

            
            _urlService = new UrlService(
                _unitOfWorkMock.Object,
                Mapper
            );
        }
        [Test]
        public async Task GetUrlsByUserIdAsync_ShouldReturnUrls_WhenUrlsExist()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var urls = new List<Url>
    {
        new Url { Id = Guid.NewGuid(), OriginalUrl = "https://test1.com", ShortUrl = "abc123", CreatedByUserId = userId },
        new Url { Id = Guid.NewGuid(), OriginalUrl = "https://test.com", ShortUrl = "def456", CreatedByUserId = userId }
    };

            _unitOfWorkMock.Setup(u => u.Urls.FindAsync(u => u.CreatedByUserId == userId)).ReturnsAsync(urls);

            // Act
            var result = await _urlService.GetUrlsByUserIdAsync(userId);

            // Assert
            ClassicAssert.IsNotNull(result);
            ClassicAssert.AreEqual(2, result.Count());
        }
    }
}
