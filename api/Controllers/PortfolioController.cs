// using System;
// using System.Collections.Generic;
// using System.Diagnostics;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Logging;

// namespace api.Controllers
// {
//     [Route("api/portfolio")]
//     [ApiController]
//     public class PortfolioController : Controller
//     {
//         private readonly ILogger<PortfolioController> _logger;

//         public PortfolioController(ILogger<PortfolioController> logger)
//         {
//             _logger = logger;
//         }



//         [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
//         public IActionResult Error()
//         {
//             return View("Error!");
//         }
//     }
// }