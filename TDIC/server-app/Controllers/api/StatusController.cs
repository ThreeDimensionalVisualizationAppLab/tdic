using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.MArticleStatus;
using TDIC.Controllers;
using TDIC.Models.EDM;

namespace API.Controllers
{
    public class MArticleStatusController : BaseApiController
    {
        [AllowAnonymous]   
        [HttpGet("index")]
        public async Task<ActionResult> GetIndex()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
/*
        [HttpGet("details/{id}")]
        public async Task<ActionResult> Details(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id = id}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Models.Status status){
            return HandleResult(await Mediator.Send(new Create.Command{ Status = status}));
        }
        

        [HttpPost("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Models.Status status)
        {
            status.status = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ Status = status}));
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id=id}));
        }

*/
    }
}