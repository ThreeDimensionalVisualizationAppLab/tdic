using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.ModelFile;
using TDIC.Controllers;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class ModelFilesController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index")]
        public async Task<ActionResult> GetModelFiles()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("details/{id}")]
        public async Task<ActionResult> GetActivity(long id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        }
        [AllowAnonymous]

        [HttpGet("file/{id}")]
        public async Task<ActionResult> GetFile(long id)
        {
            var det = await Mediator.Send(new Details.Query{ID = id});


            return File(det.Value.file_data, det.Value.type_data, det.Value.file_name);
        }

    }
}