using AutoMapper;
using GlobalSolutionAPI.Data.Dtos;
using GlobalSolutionAPI.Models;

namespace GlobalSolutionAPI.Profiles
{
    public class ApplicationUserProfile : Profile
    {
        public ApplicationUserProfile()
        {
            CreateMap<ApplicationUser, ProfileResponseDto>();
        }

    }
}
