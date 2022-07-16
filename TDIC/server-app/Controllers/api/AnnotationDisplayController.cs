using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.AnnotationDisplay;
using TDIC.Controllers;
using System.Collections.Generic;
using TDIC.Models.EDM;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class AnnotationDisplayController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index/{id}")]
        public async Task<ActionResult> GetIndex(long id)
        {
            return HandleResult(await Mediator.Send(new List.Query{id_article=id}));
        }

        
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] IList<t_annotation_display> List)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ List = List}));
        }
/*
        [AllowAnonymous]
        [HttpGet("details/id_article={id_article}&id_view={id_view}")]
        public async Task<ActionResult> GetInstruction(long id_article,long id_view)
        {
            return HandleResult(await Mediator.Send(new Details.Query{id_article = id_article,id_view=id_view}));
        }*/

    }
}