using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Shared.Dtos
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Ім'я користувача є обов'язковим")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email є обов'язковим")]
        
        public string Email { get; set; }

        [Required(ErrorMessage = "Номер телефону є обов'язковим")]
        
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Пароль є обов'язковим")]
        
        public string Password { get; set; }

        public string Role { get; set; } = "User";
    }
}
