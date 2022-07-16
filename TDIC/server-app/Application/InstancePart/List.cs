using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Instancepart
{
    public class List
    {
        public class Query : IRequest<Result<List<t_instance_part>>>{
            public long id_assy {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<t_instance_part>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<t_instance_part>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<t_instance_part>>
                    .Success(await _context.t_instance_parts.Where(x=>x.id_assy==request.id_assy).ToListAsync(cancellationToken));
            }
        }
    }
}