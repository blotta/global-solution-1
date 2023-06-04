using GlobalSolutionAPI.Contexts;
using GlobalSolutionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace GlobalSolutionAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("profile")]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _db;

        public ProfileController(UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _db = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = (await _userManager.GetUserAsync(User)).Id;
            var user = _db.Users.Include(u => u.Addresses).FirstAsync(u => u.Id == userId);
            return Ok(user);
        }
    }
}
