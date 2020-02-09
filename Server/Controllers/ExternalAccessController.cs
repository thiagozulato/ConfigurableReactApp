using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("session/external")]
    public class ExternalAccessController : ControllerBase
    {
        [HttpGet("login")]
        public IActionResult Login()
        {
            return Redirect("http://localhost:3000/application/external?code=2435927435927YHUTGTFR68767&external=1");
        }
    }
}