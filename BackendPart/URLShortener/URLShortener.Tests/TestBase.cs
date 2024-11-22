using AutoMapper;
using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace URLShortener.Tests
{
    [SetUpFixture]
    public class TestBase
    {
        protected IMapper Mapper;

        [OneTimeSetUp]
        public void GlobalSetup()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            Mapper = mappingConfig.CreateMapper();
        }
    }
}
