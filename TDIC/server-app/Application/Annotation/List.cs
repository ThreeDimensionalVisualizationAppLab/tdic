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

namespace Application.Annotation
{
    public class List
    {
        public class Query : IRequest<Result<List<t_annotation>>>{
            public long id_article {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<t_annotation>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<t_annotation>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<t_annotation>>
                    .Success(await _context.t_annotations.Where(x=>x.id_article==request.id_article).ToListAsync(cancellationToken));
            }
        }
    }
}