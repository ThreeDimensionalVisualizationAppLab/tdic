using TDIC.Models.EDM;
using FluentValidation;

namespace Application.Annotation
{
    public class AnnotationValidator : AbstractValidator<t_annotation>
    {
        public AnnotationValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}