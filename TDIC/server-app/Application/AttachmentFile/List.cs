using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
//using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
//using Persistence;

namespace Application.AttachmentFile
{
    public class List
    {
        public class Query : IRequest<Result<List<t_attachment>>>{}

        public class Handler : IRequestHandler<Query, Result<List<t_attachment>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<t_attachment>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<t_attachment>>
                    .Success(await _context.t_attachments.Select(x => new t_attachment(){
                        id_file = x.id_file,
                        name = x.name,
                        file_name = x.file_name,
                        type_data = x.type_data,
                        file_length = x.file_length,
                        itemlink=x.itemlink,
                        license = x.license,
                }).ToListAsync(cancellationToken));
            }
        }
    }
}