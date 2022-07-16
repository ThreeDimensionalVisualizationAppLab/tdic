using TDIC.Models.EDM;
using FluentValidation;

namespace Application.Instruction
{
    public class InstructionValidator : AbstractValidator<t_instruction>
    {
        public InstructionValidator()
        {
            RuleFor(x => x.title).NotEmpty();
        }
    }
}