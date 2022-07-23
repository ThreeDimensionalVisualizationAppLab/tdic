using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using System.IO;

namespace Application.AttachmentFile
{
    public class CreateEyecatch
    {
        public class Command : IRequest<Result<Unit>>{
            public long id_article {get; set;}
            public string imgfilebin {get; set;}
        }

/*
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Attachment).SetValidator(new AttachmentValidator());
            }
        }*/

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }


            public static byte[] GetByteArrayFromStream(Stream sm)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    sm.CopyTo(ms);
                    return ms.ToArray();
                }
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {


                t_article t_article = _context.t_articles.Find(request.id_article);


                t_attachment t_attachment = new t_attachment();


                t_attachment.name = "Thumbnail_" + (t_article.title ?? "") + "_" + request.id_article;
                
                string imgfile = request.imgfilebin.Substring(request.imgfilebin.IndexOf(",") + 1);
                t_attachment.file_data = GetByteArrayFromStream(new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes(imgfile)));
                t_attachment.file_data = Convert.FromBase64String(imgfile);
                t_attachment.type_data = "image/jpeg";// formFile.ContentType;
                t_attachment.file_name = t_attachment.name + ".jpg";// formFile.FileName;
                t_attachment.file_length = imgfile.Length;// formFile.Length;
                t_attachment.format_data = "jpeg";// format_data ?? System.IO.Path.GetExtension(formFile.FileName);

                t_attachment.isActive = true;


                t_attachment.create_user = "testuser";//User.Identity.Name;
                t_attachment.create_datetime = DateTime.Now;
                t_attachment.latest_update_user = "testuser";//User.Identity.Name;
                t_attachment.latest_update_datetime = DateTime.Now;


                t_attachment.id_file = 1 + (await _context.t_attachments
                                            .Where(t => t.id_file == t.id_file)
                                            .MaxAsync(t => (long?)t.id_file) ?? 0);

                await _context.AddAsync(t_attachment);


                t_article.id_attachment_for_eye_catch = t_attachment.id_file;



                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create item");

                return Result<Unit>.Success(Unit.Value);

            }
        }

    }

}