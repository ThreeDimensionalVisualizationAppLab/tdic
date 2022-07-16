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

namespace Application.Annotation
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public t_annotation Annotation {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Annotation).SetValidator(new AnnotationValidator());
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
                var annotation = await _context.t_annotations.FindAsync(request.Annotation.id_article,request.Annotation.id_annotation);

                if(annotation == null) return null;

                //_mapper.Map(request.Instruction, instruction);

                //automapperの修正方法が分からないので、暫定的に直書きする
                annotation.title=request.Annotation.title;

                annotation.description1=request.Annotation.description1;
                annotation.description2=request.Annotation.description2;
                
                annotation.status=request.Annotation.status;

                annotation.pos_x=request.Annotation.pos_x;
                annotation.pos_y=request.Annotation.pos_y;
                annotation.pos_z=request.Annotation.pos_z;

                annotation.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update annotation");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}