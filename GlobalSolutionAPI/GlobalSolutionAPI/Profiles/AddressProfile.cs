using AutoMapper;
using GlobalSolutionAPI.Data.Dtos;
using GlobalSolutionAPI.Models;

namespace GlobalSolutionAPI.Profiles
{
    public class AddressProfile : Profile
    {
        public AddressProfile()
        {
            CreateMap<Address, AddressDto>()
                .ReverseMap();

            CreateMap<AddAddressRequestDto, Address>();
        }
    }
}
