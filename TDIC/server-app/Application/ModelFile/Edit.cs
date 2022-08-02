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

namespace Application.ModelFile
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public t_part t_part {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.t_part).SetValidator(new PartValidator());
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
                var t_part = await _context.t_parts.FindAsync(request.t_part.id_part);

                if(t_part == null) return null;

                //_mapper.Map(request.Instruction, instruction);

                //automapperの修正方法が分からないので、暫定的に直書きする
                t_part.part_number=request.t_part.part_number;
                t_part.version=request.t_part.version;
                
                t_part.format_data=request.t_part.format_data;
                t_part.itemlink=request.t_part.itemlink;

                t_part.license=request.t_part.license;
                t_part.author=request.t_part.author;
                t_part.memo=request.t_part.memo;
                t_part.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}