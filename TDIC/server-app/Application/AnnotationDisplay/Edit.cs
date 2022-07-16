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

namespace Application.AnnotationDisplay
{
    public class AnnotationDisplayValidator : AbstractValidator<IList<t_annotation_display>>
    {
        public AnnotationDisplayValidator()
        {
        }
    }
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public IList<t_annotation_display> List {get; set;}
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

                foreach (var m in request.List)
                {
                    var target = await _context.t_annotation_displays.FindAsync(m.id_article, m.id_instruct, m.id_annotation);
                    target.is_display = m.is_display;
                    target.is_display_description = m.is_display_description;
                    target.latest_update_datetime = DateTime.Now;
                }



                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}