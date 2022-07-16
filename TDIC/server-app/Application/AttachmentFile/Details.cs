using System;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using MediatR;
using TDIC.Models.EDM;

namespace Application.AttachmentFile
{
    public class Details
    {

        public class Query : IRequest<Result<t_attachment>>{
            public long ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_attachment>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_attachment>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_attachment =  await _context.t_attachments.FindAsync(request.ID);

                if(t_attachment==null) throw new Exception("t_attachment not found");

                return Result<t_attachment>.Success(t_attachment);
            }
        }
    }
}