namespace GlobalSolutionAPI.Data.Dtos
{
    public class ProfileResponseDto
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public IEnumerable<AddressDto> Addresses { get; set; }
        public IEnumerable<OrderNestedDto> Orders { get; set; }
    }
}
