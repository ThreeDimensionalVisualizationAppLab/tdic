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

namespace Application.ModelFile
{
    public class List
    {
        public class Query : IRequest<Result<List<t_part>>>{}

        public class Handler : IRequestHandler<Query, Result<List<t_part>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<t_part>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<t_part>>
                    .Success(await _context.t_parts.Select(x => new t_part(){                        
                        id_part = x.id_part,
                        part_number = x.part_number,
                        version = x.version,
                        type_data = x.type_data,
                        file_name = x.file_name,
                        format_data = x.format_data,
                        file_length = x.file_length,
                        license = x.license,
                        author = x.author,
                        itemlink = x.itemlink,
                        memo = x.memo,
                        create_datetime = x.create_datetime,
                        latest_update_datetime = x.latest_update_datetime,
                }).ToListAsync(cancellationToken));
            }
        }
    }
}