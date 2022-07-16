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

namespace Application.View
{
    public class Details
    {
        public class Query : IRequest<Result<t_view>>{
            public long id_article {get; set;}
            public long id_view {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_view>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }
/*
            public async Task<Result<t_article>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<t_article>>
                    .Success(await _context.t_articles.ToListAsync(cancellationToken));
            }
*/
            

            public async Task<Result<t_view>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_view =  await _context.t_views.FindAsync(request.id_article,request.id_view);

                if(t_view==null) throw new Exception("t_article not found");

                return Result<t_view>.Success(t_view);
            }
        }
    }
}