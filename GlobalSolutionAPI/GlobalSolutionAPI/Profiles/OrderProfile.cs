using AutoMapper;
using GlobalSolutionAPI.Data.Dtos;
using GlobalSolutionAPI.Models;

namespace GlobalSolutionAPI.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderDto>()
                .ForMember(o => o.Name, s => s.MapFrom(e => e.User.Name));

            CreateMap<Order, OrderNestedDto>();
            CreateMap<Order, OrderDetailedDto>();

            CreateMap<AddOrderRequestDto, Order>();
        }
    }
}
