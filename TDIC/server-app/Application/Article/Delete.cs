using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;





namespace Application.Article
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public long id_article {get; set;}
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
                var article =  await _context.t_articles.FindAsync(request.id_article);

                if(article == null) return null;
                
                _context.Remove(article);

                var result = await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("fail to delete t_instruction");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}