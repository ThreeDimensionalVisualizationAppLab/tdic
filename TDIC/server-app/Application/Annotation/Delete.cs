using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;





namespace Application.Annotation
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public long id_article {get; set;}
            public long id_annotation {get; set;}
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
                var annotation =  await _context.t_annotations.FindAsync(request.id_article, request.id_annotation);

                if(annotation == null) return null;
                
                var annotation_displays =  await _context.t_annotation_displays.Where(x=>x.id_article==request.id_article && x.id_annotation == request.id_annotation).ToListAsync();

                if(annotation_displays.Count>0){
                    _context.t_annotation_displays.RemoveRange(annotation_displays);
                }

                _context.Remove(annotation);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete t_instruction");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}