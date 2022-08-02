using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.AttachmentFile
{
    public class Upload
    {
        public class Command : IRequest<Result<Unit>>{
            public t_attachment t_attachment {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.t_attachment).SetValidator(new AttachmentValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {


                long id_file = 1 + (await _context.t_attachments
                                        .MaxAsync(t => (long?)t.id_file) ?? 0);

                request.t_attachment.id_file = id_file;

                
                request.t_attachment.create_user = "";
                request.t_attachment.create_datetime = DateTime.Now;
                request.t_attachment.latest_update_user = "";
                request.t_attachment.latest_update_datetime = DateTime.Now;

                _context.t_attachments.Add(request.t_attachment);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to upload task");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }

}