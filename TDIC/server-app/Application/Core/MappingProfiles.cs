using AutoMapper;
using TDIC.Models.EDM;

namespace TDIC.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<t_attachment, t_attachment>();
            CreateMap<t_instruction, t_instruction>();
        }
    }
}