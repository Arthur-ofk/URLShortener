using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Url : BaseEntity
    {
        public string OriginalUrl { get; set; }
        public string ShortUrl { get; set; }
        public Guid CreatedByUserId { get; set; } // Зв'язок з User

        public User CreatedByUser { get; set; }
    }
}
