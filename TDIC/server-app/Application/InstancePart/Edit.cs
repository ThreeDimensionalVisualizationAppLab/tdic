using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TDIC.Models.EDM;
using TDIC.Application.Core;
using System.Linq;

namespace Application.Instancepart
{
    public class InstancepartValidator : AbstractValidator<IList<t_instance_part>>
    {
        public InstancepartValidator()
        {
        }
    }
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public IList<t_instance_part> List {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                //RuleFor(x => x.Instancepart).SetValidator(new InstancepartValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly db_data_coreContext _context;
        private readonly IMapper _mapper;
            public Handler(db_data_coreContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var t_assembly = await _context.t_assemblies.FindAsync(request.List.FirstOrDefault().id_assy);
                
                if(t_assembly == null) return null;

                foreach (var m in request.List)
                {
                    var target = await _context.t_instance_parts.FindAsync(m.id_assy, m.id_inst);
                    target.pos_x = m.pos_x;
                    target.pos_y = m.pos_y;
                    target.pos_z = m.pos_z;
                    target.latest_update_datetime = DateTime.Now;
                }



                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}