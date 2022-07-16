using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;





namespace Application.Instruction
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public long id_article {get; set;}
            public long id_instruct {get; set;}
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var instruction =  await _context.t_instructions.FindAsync(request.id_article, request.id_instruct);

                if(instruction == null) return null;
                
                var annotation_displays =  await _context.t_annotation_displays.Where(x=>x.id_article==request.id_article && x.id_instruct == request.id_instruct).ToListAsync();

                _context.t_annotation_displays.RemoveRange(annotation_displays);
                _context.Remove(instruction);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete t_instruction");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}