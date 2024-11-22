using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Shared.Dtos
{
    public class UrlForCreationDto
    {
        [Required(ErrorMessage = "Оригінальний URL є обов'язковим")]
        
        public string OriginalUrl { get; set; }
    }
}
