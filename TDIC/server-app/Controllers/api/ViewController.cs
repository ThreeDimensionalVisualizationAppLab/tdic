using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.View;
using TDIC.Controllers;
using TDIC.Models.EDM;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class ViewController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index/{id}")]
        public async Task<ActionResult> GetInstructions(long id)
        {
            return HandleResult(await Mediator.Send(new List.Query{id_article=id}));
        }

        [AllowAnonymous]
        [HttpGet("details/id_article={id_article}&id_view={id_view}")]
        public async Task<ActionResult> GetInstruction(long id_article,long id_view)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id_article = id_article,id_view=id_view}));
        }


        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_view view)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ View = view}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_view view){
            return HandleResult(await Mediator.Send(new Create.Command{ View = view}));
        }
        
        [HttpPost("delete/id_article={id_article}&id_view={id_view}")]
        public async Task<IActionResult> Delete(long id_article, int id_view)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_article=id_article, id_view=id_view}));
        }
    }
}