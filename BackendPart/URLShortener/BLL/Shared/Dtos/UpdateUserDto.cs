using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Shared.Dtos
{
    public class UpdateUserDto
    {
        
        public string UserName { get; set; }

      
        
        public string Email { get; set; }

        
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Роль є обов'язковою")]
        public string Role { get; set; }
    }
}
