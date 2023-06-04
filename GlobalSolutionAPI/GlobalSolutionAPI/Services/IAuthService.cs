using GlobalSolutionAPI.Data.Dtos;
using GlobalSolutionAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace GlobalSolutionAPI.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUser(RegisterUserDto registerUserDto);
        Task<LoginUserResponseDto> Login(LoginUserRequestDto loginUserRequestDto);
        Task<bool> AddRole(Guid userId, string roleName);
        Task<IList<string>> GetUsers();
    }
}