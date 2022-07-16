using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.WebsiteSetting;
using TDIC.Controllers;
using TDIC.Models.EDM;





// For SPA
namespace API.Controllers
{
    public class WebsiteSettingController : BaseApiController
    { 

        [AllowAnonymous]
        [HttpGet("details/title={title}")]
        public async Task<ActionResult> GetInstruction(string title)
        {
            return HandleResult(await Mediator.Send(new Details.Query{title = title}));
        }

    }
}