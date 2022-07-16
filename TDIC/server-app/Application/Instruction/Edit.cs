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

namespace Application.Instruction
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public t_instruction Instruction {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Instruction).SetValidator(new InstructionValidator());
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
                var instruction = await _context.t_instructions.FindAsync(request.Instruction.id_article,request.Instruction.id_instruct);

                if(instruction == null) return null;

                //_mapper.Map(request.Instruction, instruction);

                //automapperの修正方法が分からないので、暫定的に直書きする
                instruction.id_view=request.Instruction.id_view;
                instruction.title=request.Instruction.title;
                instruction.display_order=request.Instruction.display_order;
                instruction.short_description=request.Instruction.short_description;
                instruction.memo=request.Instruction.memo;

                instruction.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}