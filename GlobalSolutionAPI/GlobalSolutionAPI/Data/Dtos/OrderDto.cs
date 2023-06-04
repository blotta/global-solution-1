using GlobalSolutionAPI.Models;

namespace GlobalSolutionAPI.Data.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }

        public AddressDto Address { get; set; }

        public string Name { get; set; }
        public OrderType Type { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime? PickedUpAt { get; set; }
    }
}
