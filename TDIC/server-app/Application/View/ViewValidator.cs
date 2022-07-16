using TDIC.Models.EDM;
using FluentValidation;

namespace Application.View
{
    public class ViewValidator : AbstractValidator<t_view>
    {
        public ViewValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}