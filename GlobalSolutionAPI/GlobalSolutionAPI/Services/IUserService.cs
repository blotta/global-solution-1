using GlobalSolutionAPI.Models;
using System.Security.Claims;

namespace GlobalSolutionAPI.Services
{
    public interface IUserService
    {
        Task<ApplicationUser> GetUser(ClaimsPrincipal principal);
    }
}