using Microsoft.AspNetCore.Identity;

namespace GlobalSolutionAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() : base()
        {
            
        }
        public string Name { get; set; }

        public ICollection<Address> Addresses { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
