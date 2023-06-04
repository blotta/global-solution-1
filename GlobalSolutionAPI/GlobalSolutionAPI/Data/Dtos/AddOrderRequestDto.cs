using GlobalSolutionAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace GlobalSolutionAPI.Data.Dtos
{
    public class AddOrderRequestDto
    {
        [Required]
        public int AddressId { get; set; }

        [Required]
        public OrderType Type { get; set; }
        [Required]
        public DateTime ScheduledDate { get; set; }

    }
}
