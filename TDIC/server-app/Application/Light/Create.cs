using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using FluentValidation;





namespace Application.Light
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>{
            public t_light light {get; set;}
        }


        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.light).SetValidator(new LightValidator());
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

                
                long id_light = 1 + (await _context.t_lights.Where(t => t.id_article == request.light.id_article)
                                        .MaxAsync(t => (long?)t.id_light) ?? 0);

                request.light.id_light = id_light;

                
                request.light.create_user = "";
                request.light.create_datetime = DateTime.Now;
                request.light.latest_update_user = "";
                request.light.latest_update_datetime = DateTime.Now;

                _context.t_lights.Add(request.light);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create task");

                return Result<Unit>.Success(Unit.Value);
            }
        }

    }

}