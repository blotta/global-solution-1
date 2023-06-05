using GlobalSolutionAPI.Models;

namespace GlobalSolutionAPI.Data.Dtos
{
    public class OrderDetailedDto
    {
        public int Id { get; set; }

        public AddressDto Address { get; set; }

        public UserNestedDto User { get; set; }
        public OrderType Type { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime? PickedUpAt { get; set; }
    }
}
