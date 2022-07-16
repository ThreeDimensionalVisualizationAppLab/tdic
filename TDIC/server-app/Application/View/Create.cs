


using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.View
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>{
            public t_view View {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.View).SetValidator(new ViewValidator());
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

                
                int id_view = 1 + (await _context.t_views.Where(t => t.id_article == request.View.id_article)
                                        .MaxAsync(t => (int?)t.id_view) ?? 0);

                request.View.id_view = id_view;

                
                request.View.create_user = "";
                request.View.create_datetime = DateTime.Now;
                request.View.latest_update_user = "";
                request.View.latest_update_datetime = DateTime.Now;

                _context.t_views.Add(request.View);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create view");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }

}