/*
using System;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using MediatR;
using TDIC.Models.EDM;

namespace Application.ModelFile
{
    public class Details
    {

        public class Query : IRequest<Result<t_part>>{
            public long ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_part>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<t_part>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_part =  await _context.t_parts.FindAsync(request.ID);

                if(t_part==null) throw new Exception("t_part not found");

                return Result<t_part>.Success(t_part);
            }
        }
    }
}


*/

using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.ModelFile
{
    public class Upload
    {
        public class Command : IRequest<Result<Unit>>{
            public t_part Part {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Part).SetValidator(new PartValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {




                
                long id_part = 1 + (await _context.t_parts
                                        .MaxAsync(t => (long?)t.id_part) ?? 0);

                request.Part.id_part = id_part;

                
                request.Part.create_user = "";
                request.Part.create_datetime = DateTime.Now;
                request.Part.latest_update_user = "";
                request.Part.latest_update_datetime = DateTime.Now;

                _context.t_parts.Add(request.Part);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to upload task");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }

}