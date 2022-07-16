using TDIC.Models.EDM;
using FluentValidation;

namespace Application.Light
{
    public class LightValidator : AbstractValidator<t_light>
    {
        public LightValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}