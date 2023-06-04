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
            var user = await _userService.GetUser(User);
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

        [HttpPost]
        [Route("order")]
        public async Task<IActionResult> PlaceOrder(AddOrderRequestDto addOrderRequestDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.GetUser(User);
            var address = user.Addresses.FirstOrDefault(address => address.Id == addOrderRequestDto.AddressId);
            if (address == null)
                return BadRequest("Endereço inválido");

            if (addOrderRequestDto.ScheduledDate.Date <= DateTime.Today)
                return BadRequest("Data inválida");

            var order = _mapper.Map<Order>(addOrderRequestDto);
            order.CreatedAt = DateTime.Now;
            order.Status = OrderStatus.Created;
            order.Address = address;

            user.Orders.Add(order);
            await _db.SaveChangesAsync();

            await _db.Entry(order).ReloadAsync();

            return Ok(_mapper.Map<OrderDto>(order));
        }

        [HttpDelete]
        [Route("order/{orderId:int}")]
        public async Task<IActionResult> CancelOrder([FromRoute] int orderId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userService.GetUser(User);

            var order = user.Orders.FirstOrDefault(o => o.Id == orderId);
            if (order == null)
                return NotFound();

            if (order.Status != OrderStatus.PickedUp)
                order.Status = OrderStatus.Canceled;
            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}
