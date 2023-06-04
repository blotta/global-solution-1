using GlobalSolutionAPI.Contexts;
using GlobalSolutionAPI.Data.Dtos;
using GlobalSolutionAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Security.Claims;

namespace GlobalSolutionAPI.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserService(ApplicationDbContext applicationDbContext, UserManager<ApplicationUser> userManager)
        {
            _db = applicationDbContext;
            _userManager = userManager;
        }

        public async Task<ApplicationUser> GetUser(ClaimsPrincipal principal)
        {
            var userId = (await _userManager.GetUserAsync(principal)).Id;
            var user = await _db.Users.Include(u => u.Addresses).FirstAsync(u => u.Id == userId);
            return user;
        }

    }
}
