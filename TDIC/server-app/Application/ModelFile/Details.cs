using System;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using MediatR;
using TDIC.Models.EDM;

namespace Application.ModelFile
{
    public class Details
    {

        public class Query : IRequest<Result<t_part>>{
            public long ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_part>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_part>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_part =  await _context.t_parts.FindAsync(request.ID);

                if(t_part==null) throw new Exception("t_part not found");

                return Result<t_part>.Success(t_part);
            }
        }
    }
}