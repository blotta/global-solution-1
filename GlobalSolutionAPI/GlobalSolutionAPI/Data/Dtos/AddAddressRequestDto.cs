using System.ComponentModel.DataAnnotations;

namespace GlobalSolutionAPI.Data.Dtos
{
    public class AddAddressRequestDto
    {
        [Required]
        public string Street { get; set; }
        [Required]
        public int Number { get ; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string ZipCode { get; set; }
    }
}
