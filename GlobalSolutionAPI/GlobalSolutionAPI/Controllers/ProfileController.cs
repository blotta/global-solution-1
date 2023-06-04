using AutoMapper;
using GlobalSolutionAPI.Contexts;
using GlobalSolutionAPI.Data.Dtos;
using GlobalSolutionAPI.Models;
using GlobalSolutionAPI.Services;
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
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public ProfileController(IUserService userService, UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext, IMapper mapper)
        {
            _userManager = userManager;
            _db = dbContext;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = (await _userManager.GetUserAsync(User)).Id;
            var user = await _db.Users.Include(u => u.Addresses).FirstAsync(u => u.Id == userId);
            var resp = _mapper.Map<ProfileResponseDto>(user);
            return Ok(resp);
        }

        [HttpPost]
        [Route("address")]
        public async Task<IActionResult> AddAddress(AddAddressRequestDto addAddressRequestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var user = await _userService.GetUser(User);
            var address = _mapper.Map<Address>(addAddressRequestDto);
            user.Addresses.Add(address);
            _db.SaveChanges();

            await _db.Entry(address).ReloadAsync();

            return Ok(_mapper.Map<AddressDto>(address));

        }

        [HttpGet]
        [Route("address/{addressId:int}")]
        public async Task<IActionResult> GetAddress(int addressId)
        {
            var user = await _userService.GetUser(User);
            var address = user.Addresses.FirstOrDefault(address => address.Id == addressId);
            if (address == null)
                return NotFound();

            return Ok(_mapper.Map<AddressDto>(address));
        }

        [HttpDelete]
        [Route("address/{addressId:int}")]
        public async Task<IActionResult> RemoveAddress(int addressId)
        {
            var user = await _userService.GetUser(User);
            var address = user.Addresses.FirstOrDefault(address => address.Id == addressId);
            if (address == null)
                return NotFound();

            user.Addresses.Remove(address);
            _db.SaveChanges();

            return Ok(_mapper.Map<AddressDto>(address));
        }
    }
}
