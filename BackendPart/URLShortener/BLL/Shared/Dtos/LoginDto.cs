using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Shared.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Ім'я користувача або Email є обов'язковим")]
        public string UserNameOrEmail { get; set; }

        [Required(ErrorMessage = "Пароль є обов'язковим")]
        
        public string Password { get; set; }
    }
}
