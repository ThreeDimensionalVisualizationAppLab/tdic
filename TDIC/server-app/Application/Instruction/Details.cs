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

namespace Application.Instruction
{
    public class Details
    {
        public class Query : IRequest<Result<t_instruction>>{
            public long id_article {get; set;}
            public long id_instruct {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_instruction>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_instruction>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var t_instruction =  await _context.t_instructions.FindAsync(request.id_article, request.id_instruct);

                if(t_instruction==null) throw new Exception("t_instruction not found");

                return Result<t_instruction>.Success(t_instruction);

            }
        }
    }
}