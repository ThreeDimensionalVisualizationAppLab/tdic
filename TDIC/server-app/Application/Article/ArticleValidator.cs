using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;

namespace Application.Article
{
    public class ArticleValidator : AbstractValidator<t_article>
    {
        public ArticleValidator()
        {
        }
    }
}
