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
    public class List
    {
        public class Query : IRequest<Result<List<t_article>>>{
            public Boolean IsAuthenticated {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<t_article>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<t_article>>> Handle(Query request, CancellationToken cancellationToken)
            {
                if(request.IsAuthenticated){
                    return Result<List<t_article>>
                        .Success(await _context.t_articles.ToListAsync(cancellationToken));
                } else{
                    return Result<List<t_article>>
                        .Success(await _context.t_articles.Where(t => t.statusNavigation.is_approved==true).ToListAsync(cancellationToken));
                }
            }
        }
    }
}