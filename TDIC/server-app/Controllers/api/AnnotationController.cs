using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Annotation;
using TDIC.Controllers;
using TDIC.Models.EDM;





// For SPA
namespace API.Controllers
{
    [Authorize]
    public class AnnotationController : BaseApiController
    {        
        [AllowAnonymous]
        [HttpGet("Index/{id}")]
        public async Task<ActionResult> GetIndex(long id)
        {
            return HandleResult(await Mediator.Send(new List.Query{id_article=id}));
        }


        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_annotation annotation)
        {
            //task.id = id;

            return HandleResult(await Mediator.Send(new Edit.Command{ Annotation = annotation}));
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] t_annotation annotation){
            return HandleResult(await Mediator.Send(new Create.Command{ Annotation = annotation}));
        }


        [HttpPost("delete/id_article={id_article}&id_annotation={id_annotation}")]
        public async Task<IActionResult> Delete(long id_article,long id_annotation)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id_article=id_article, id_annotation=id_annotation}));
        }

        // [HttpGet("details/{id}")]
        // public async Task<ActionResult> GetActivity(long id)
        // {
        //     return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        // }

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