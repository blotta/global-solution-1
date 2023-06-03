using GlobalSolutionAPI.Constants;
using GlobalSolutionAPI.Data.Dtos;
using GlobalSolutionAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GlobalSolutionAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            var result = await _authService.RegisterUser(registerUserDto);

            if (result)
                return Ok("Success");

            return BadRequest();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserRequestDto loginUserDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new LoginUserResponseDto { Success = false });

            var result = await _authService.Login(loginUserDto);

            if (result.Success)
                return Ok(result);

            return Unauthorized(result);
        }

        [HttpGet]
        [Authorize]
        [Route("testauth")]
        public IActionResult TestAuthentication()
        {
            var user = User;
            return Ok();
        }

        [HttpGet]
        [Authorize(Policy = Policies.HasAddress)]
        [Route("testpolicy")]
        public IActionResult TestPolicy()
        {
            return Ok();
        }
        
        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        [Route("testadmin")]
        public IActionResult TestAdmin()
        {
            return Ok();
        }


        [HttpPost]
        [Authorize(Roles = Roles.Admin)]
        [Route("assign-admin/{userId:guid}")]
        public async Task<IActionResult> AssignAdmin([FromRoute] Guid userId)
        {

            var result = await _authService.AddRole(userId, Roles.Admin);

            return Ok(result);
        }
    }
}
