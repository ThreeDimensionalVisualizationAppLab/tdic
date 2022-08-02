using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.ModelFile;
using TDIC.Controllers;
using TDIC.Models.EDM;
using Microsoft.AspNetCore.Http;
using System.IO;



// For SPA
namespace API.Controllers
{
    public class FileModel{
        string FileName {get; set;}
        IFormFile file {get; set;}
    }



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
        public async Task<ActionResult> GetDetails(long id)
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





        [HttpPost("uploadfile")]
        public async Task<ActionResult> UploadFile([FromForm] IFormFile file)
        {
            
            t_part t_part = new t_part();

            if (file == null)
            {
                return HandleResult(await Mediator.Send(new Upload.Command{ Part = null}));
            }

            t_part.part_number = file.FileName;
            t_part.file_data = GetByteArrayFromStream(file.OpenReadStream());
            t_part.type_data = file.ContentType;
            t_part.file_name = file.FileName;
            t_part.file_length = file.Length;
            t_part.format_data = "";


            t_part.itemlink = "";
            t_part.license = "";
            t_part.author = "";
            t_part.memo = "";


            return HandleResult(await Mediator.Send(new Upload.Command{ Part = t_part}));
        }


        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] t_part t_part){
            return HandleResult(await Mediator.Send(new Edit.Command{ t_part = t_part}));
        }

        
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{id=id}));
        }
        
        public static byte[] GetByteArrayFromStream(Stream sm)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                sm.CopyTo(ms);
                return ms.ToArray();
            }
        }
    }
}