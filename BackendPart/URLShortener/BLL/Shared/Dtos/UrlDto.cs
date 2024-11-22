using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Shared.Dtos
{
    public class UrlDto
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public string OriginalUrl { get; set; }
        public string ShortUrl { get; set; }
        public Guid CreatedByUserId { get; set; }
    }
}
