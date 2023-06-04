using System.ComponentModel.DataAnnotations;

namespace GlobalSolutionAPI.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public virtual Address Address { get; set; }

        [Required]
        public virtual ApplicationUser User { get; set; }
        [Required]
        public OrderType Type { get; set; }
        [Required]
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ScheduledDate { get; set; }
        public DateTime? PickedUpAt { get; set; }

    }
}
