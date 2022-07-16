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
    public class Details
    {
        public class Query : IRequest<Result<t_instance_part>>{
            public long id_assy {get; set;}
            public long id_inst {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_instance_part>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }
            

            public async Task<Result<t_instance_part>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_instance_part =  await _context.t_instance_parts.FindAsync(request.id_assy,request.id_inst);

                if(t_instance_part==null) throw new Exception("t_instance_part not found");

                return Result<t_instance_part>.Success(t_instance_part);
            }
        }
    }
}