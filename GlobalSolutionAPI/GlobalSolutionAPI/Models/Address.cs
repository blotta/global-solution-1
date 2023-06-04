using System.ComponentModel.DataAnnotations;

namespace GlobalSolutionAPI.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public int Number { get ; set; }
        [Required]
        public string City { get; set; }
        [Required]
        [MaxLength(2)]
        public string State { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string ZipCode { get; set; }

        public virtual ApplicationUser User { get; set; }
        public Address()
        {
        }
    }
}
