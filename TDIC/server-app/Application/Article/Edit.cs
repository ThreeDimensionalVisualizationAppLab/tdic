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

namespace Application.Article
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public t_article Article {get; set;}
        }
        public class CommandVelidator : AbstractValidator<Command>
        {
            public CommandVelidator()
            {
                RuleFor(x => x.Article).SetValidator(new ArticleValidator());
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
                var article = await _context.t_articles.FindAsync(request.Article.id_article);

                if(article == null) return null;

                //_mapper.Map(request.Instruction, instruction);

                //automapperの修正方法が分からないので、暫定的に直書きする
                article.id_assy=request.Article.id_assy;
                article.status=request.Article.status;


                article.title=request.Article.title;
                
                article.short_description=request.Article.short_description;                
                article.long_description=request.Article.long_description;
                article.meta_description=request.Article.meta_description;
                
                article.gammaOutput=request.Article.gammaOutput;
                article.isStarrySky=request.Article.isStarrySky;

                article.latest_update_datetime=DateTime.Now;

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("failed to update task");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}