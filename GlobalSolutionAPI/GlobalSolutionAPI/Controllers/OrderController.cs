using AutoMapper;
using GlobalSolutionAPI.Constants;
using GlobalSolutionAPI.Contexts;
using GlobalSolutionAPI.Data.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GlobalSolutionAPI.Controllers
{
    [ApiController]
    [Authorize(Roles = $"{Roles.Admin},{Roles.Manager}")]
    [Route("orders")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public OrderController(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _db = applicationDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var orders = await _db.Orders
                .Include(o => o.User)
                .Include(o => o.Address)
                .ToListAsync();

            var ret = _mapper.Map<IEnumerable<OrderDetailedDto>>(orders);

            return Ok(ret);
        }

        [HttpGet]
        [Route("{orderId:int}")]
        public async Task<IActionResult> Get([FromRoute] int orderId)
        {
            var order = await _db.Orders
                .Include(o => o.User)
                .Include(o => o.Address)
                .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null)
                return NotFound();

            var ret = _mapper.Map<OrderDetailedDto>(order);

            return Ok(ret);
        }

        [HttpPost]
        [Route("{orderId:int}/schedule")]
        public async Task<IActionResult> ScheduleForPickup([FromRoute] int orderId)
        {
            var order = await _db.Orders
                .Include(o => o.User)
                .Include(o => o.Address)
                .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null)
                return NotFound();

            if (order.Status != Models.OrderStatus.Created)
                return BadRequest("Pedido já processado");

            if (order.ScheduledDate.Date <= DateTime.Now)
                return BadRequest("Data de agendamento inválida");

            order.Status = Models.OrderStatus.Scheduled;
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("{orderId:int}/pickup")]
        public async Task<IActionResult> PickupOrder([FromRoute] int orderId)
        {
            var order = await _db.Orders
                .Include(o => o.User)
                .Include(o => o.Address)
                .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null)
                return NotFound();

            if (order.Status != Models.OrderStatus.Scheduled)
                return BadRequest("Pedido não está agendado para coleta");

            order.Status = Models.OrderStatus.PickedUp;
            order.PickedUpAt = DateTime.Now;
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("{orderId:int}")]
        public async Task<IActionResult> CancelOrder([FromRoute] int orderId)
        {
            var order = await _db.Orders
                .Include(o => o.User)
                .Include(o => o.Address)
                .FirstOrDefaultAsync(o => o.Id == orderId);
            if (order == null)
                return NotFound();

            if (order.Status == Models.OrderStatus.PickedUp || order.Status == Models.OrderStatus.Canceled)
                return BadRequest("Pedido já finalizado");

            order.Status = Models.OrderStatus.Canceled;
            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}
