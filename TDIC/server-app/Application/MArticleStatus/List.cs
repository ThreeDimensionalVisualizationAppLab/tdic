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

namespace Application.MArticleStatus
{
    public class List
    {
        public class Query : IRequest<Result<List<m_status_article>>>{
            public long id_article {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<m_status_article>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<m_status_article>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<m_status_article>>
                    .Success(await _context.m_status_articles.ToListAsync(cancellationToken));
            }
        }
    }
}
