using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;

namespace Application.AttachmentFile
{
    public class AttachmentValidator : AbstractValidator<t_attachment>
    {
        public AttachmentValidator()
        {
        }
    }
}
