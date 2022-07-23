using System;
using System.Threading.Tasks;
//using Domain;
using Microsoft.AspNetCore.Mvc;
//using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.AttachmentFile;
using TDIC.Controllers;
using TDIC.DTOs;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class AttachmentFilesController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index")]
        public async Task<ActionResult> GetAttachmentFiles()
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


            return File(det.Value.file_data, det.Value.type_data, det.Value.name);
        }

        [HttpPost("createeyecatch")]
        public async Task<IActionResult> CreateEyecatch([FromBody] AttachmentfileEyecatchDtO image){
            return HandleResult(await Mediator.Send(new CreateEyecatch.Command{ id_article=image.id_article, imgfilebin=image.imgfilebin }));
        }

        // [HttpGet("filedata/{id}")]
        // public async Task<ActionResult> GetAttachmentFileData(long id)
        // {
        //     return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        // }
        
        // [HttpGet("filedata/{id}")]
        // public async Task<IActionResult> GetAttachmentFile(long id)
        // {

        //     t_attachment t_attachment = await _context.t_attachments.FindAsync(id);

        //     return File(t_attachment.file_data, t_attachment.type_data, t_attachment.file_name);
        // }
/*
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity){
            return HandleResult(await Mediator.Send(new Create.Command{ Activity = activity}));
        }
        

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, [FromBody]Activity activity)
        {
            activity.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id}));
        }
*/

    }
}