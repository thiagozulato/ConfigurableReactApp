using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ConfigurationsController(IConfiguration config)
        {
            _config = config;    
        }

        [HttpGet]
        public IActionResult Get()
        {
            Thread.Sleep(1000);
            
            return Ok(new {
                basePath = _config["UIConfiguration:basePath"]
            });
        }

        [HttpGet("theme")]
        public IActionResult GetTheme()
        {
            Thread.Sleep(1000);
            
            return Ok(new {
                PrimaryColor = "#009688",
                Border = "1px solid #efefef",
                Success = "#f2f2f2",
                Error = "#f2f2f2",
                Warning = "#f2f2f2",
                Information = "#f2f2f2"
            });
        }

        [HttpGet("menu")]
        public IActionResult GetMenu()
        {
            return Ok(new [] {
                new Menu {
                    Id = 1,
                    Codigo = "000001",
                    Nome = "Início",
                    Url = "/"
                },
                new Menu {
                    Id = 2,
                    Codigo = "000002",
                    Nome = "Contato",
                    Url = "/contato"
                },
                new Menu {
                    Id = 3,
                    Codigo = "000003",
                    Nome = "Sobre",
                    Url = "/sobre"
                },
                new Menu {
                    Id = 4,
                    Codigo = "000004",
                    Nome = "Cadastro",
                    Url = "/cadastro",
                    SubMenus = {
                        new Menu {
                            Id = 41,
                            Codigo = "000041",
                            Nome = "Cadastro de Pessoa",
                            Url = "/cadastro/pessoa"
                        },
                        new Menu {
                            Id = 42,
                            Codigo = "000042",
                            Nome = "Cadastro de Endereço",
                            Url = "/cadastro/endereco"
                        }
                    }
                }
            });
        }
    }

    public class Menu
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Nome { get; set; }
        public string Url { get; set; }
        public List<Menu> SubMenus { get; } = new List<Menu>();
    }
}
