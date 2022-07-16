using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.WebsiteSetting
{
    public class Details
    {
        public class Query : IRequest<Result<t_website_setting>>{
            public string title {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<t_website_setting>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }            

            public async Task<Result<t_website_setting>> Handle(Query request, CancellationToken cancellationToken)
            {
                var t_website_setting =  await _context.t_website_settings.FindAsync(request.title);

                if(t_website_setting==null) throw new Exception("t_website_setting not found");

                return Result<t_website_setting>.Success(t_website_setting);
            }
        }
    }
}