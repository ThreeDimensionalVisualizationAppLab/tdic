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

namespace Application.Article
{
    public class Details
    {
        public class Query : IRequest<Result<t_article>>{
            public long ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_article>>
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
            

            public async Task<Result<t_article>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_article =  await _context.t_articles.FindAsync(request.ID);

                if(t_article==null) throw new Exception("t_article not found");

                return Result<t_article>.Success(t_article);
            }
        }
    }
}