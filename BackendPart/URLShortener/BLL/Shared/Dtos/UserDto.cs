using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Shared.Dtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; } 
        public string PhoneNumber { get; set; } 
        public string Role { get; set; }
    }
}
