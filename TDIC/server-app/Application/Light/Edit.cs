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

namespace Application.Light
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public t_light Light {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Light).SetValidator(new LightValidator());
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
                var light = await _context.t_lights.FindAsync(request.Light.id_article,request.Light.id_light);

                if(light == null) return null;

                //_mapper.Map(request.Instruction, instruction);

                //automapperの修正方法が分からないので、暫定的に直書きする
                light.light_type=request.Light.light_type;
                light.title=request.Light.title;
                light.short_description=request.Light.short_description;

                light.color=request.Light.color;
                light.intensity=request.Light.intensity;                
                
                light.px=request.Light.px;
                light.py=request.Light.py;
                light.pz=request.Light.pz;

                
                light.distance=request.Light.distance;
                light.decay=request.Light.decay;
                light.power=request.Light.power;
                light.shadow=request.Light.shadow;
                
                light.tx=request.Light.tx;
                light.ty=request.Light.ty;
                light.tz=request.Light.tz;

                
                light.skycolor=request.Light.skycolor;
                light.groundcolor=request.Light.groundcolor;
                light.is_lensflare=request.Light.is_lensflare;
                light.lfsize=request.Light.lfsize;
                

                light.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}