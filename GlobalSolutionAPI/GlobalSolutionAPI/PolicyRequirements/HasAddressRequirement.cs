using Microsoft.AspNetCore.Authorization;

namespace GlobalSolutionAPI.PolicyRequirements
{
    public class HasAddressRequirement : IAuthorizationRequirement
    {
        public HasAddressRequirement() { }
    }
}
