using Microsoft.AspNetCore.Authorization;

namespace GlobalSolutionAPI.PolicyRequirements
{
    public class HasAddressHandler : AuthorizationHandler<HasAddressRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasAddressRequirement requirement)
        {
            if (true)
                context.Succeed(requirement);
            // context.Fail();

            return Task.CompletedTask;
        }
    }
}
