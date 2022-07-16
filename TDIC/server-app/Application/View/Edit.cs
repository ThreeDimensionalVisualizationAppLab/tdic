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

namespace Application.View
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
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
        private readonly IMapper _mapper;
            public Handler(db_data_coreContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var view = await _context.t_views.FindAsync(request.View.id_article,request.View.id_view);

                if(view == null) return null;

                //_mapper.Map(request.Instruction, instruction);

                //automapperの修正方法が分からないので、暫定的に直書きする
                view.title=request.View.title;

                view.cam_pos_x=request.View.cam_pos_x;
                view.cam_pos_y=request.View.cam_pos_y;
                view.cam_pos_z=request.View.cam_pos_z;
                
                
                view.cam_lookat_x=request.View.cam_lookat_x;
                view.cam_lookat_y=request.View.cam_lookat_y;
                view.cam_lookat_z=request.View.cam_lookat_z;
                
                
                view.cam_quat_x=request.View.cam_quat_x;
                view.cam_quat_y=request.View.cam_quat_y;
                view.cam_quat_z=request.View.cam_quat_z;              
                view.cam_quat_w=request.View.cam_quat_w;  
                
                view.obt_target_x=request.View.obt_target_x;
                view.obt_target_y=request.View.obt_target_y;
                view.obt_target_z=request.View.obt_target_z;
                

                view.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}