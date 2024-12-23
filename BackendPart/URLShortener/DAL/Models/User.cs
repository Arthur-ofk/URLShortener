﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Email { get; set; } 
        public string PhoneNumber { get; set; } 
        public string PasswordHash { get; set; }
        public string Role { get; set; } 

        public ICollection<Url> Urls { get; set; }
    }
}
