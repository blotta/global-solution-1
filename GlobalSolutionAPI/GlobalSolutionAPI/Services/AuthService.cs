using GlobalSolutionAPI.Constants;
using GlobalSolutionAPI.Data.Dtos;
using GlobalSolutionAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GlobalSolutionAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;

        public AuthService(
            UserManager<ApplicationUser> userManager
            , RoleManager<IdentityRole> roleManager
            , SignInManager<ApplicationUser> signInManager
            , IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _config = config;
        }
        public async Task<bool> RegisterUser(RegisterUserDto registerUserDto)
        {
            var identityUser = new ApplicationUser
            {
                UserName = registerUserDto.UserName,
                Email = registerUserDto.UserName,
                Name = registerUserDto.Name,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(identityUser, registerUserDto.Password);
            if (result.Succeeded)
                await _userManager.SetLockoutEnabledAsync(identityUser, false);

            if (result.Succeeded && await _userManager.Users.CountAsync() == 1)
            {

                await _roleManager.CreateAsync(new IdentityRole(Roles.Admin));
                await _roleManager.CreateAsync(new IdentityRole(Roles.Manager));

                var user = await _userManager.FindByNameAsync(registerUserDto.UserName);
                await _userManager.AddToRoleAsync(user, Roles.Admin);
            }

            return result.Succeeded;
        }

        public async Task<LoginUserResponseDto> Login(LoginUserRequestDto loginUserRequestDto)
        {
            var result = await _signInManager.PasswordSignInAsync(loginUserRequestDto.UserName, loginUserRequestDto.Password, false, false);
            if (result.Succeeded)
            {
                var token = await GenerateToken(loginUserRequestDto.UserName);
                return new LoginUserResponseDto
                {
                    Success = true,
                    Token = token
                };
            }

            return new LoginUserResponseDto { Success = false };
        }

        private async Task<string> GenerateToken(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var tokenClaims = await GetUserClaims(user);

            var expirationdate = DateTime.UtcNow.AddSeconds(60 * 60);

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));
            var signinCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                claims: tokenClaims,
                notBefore: DateTime.Now,
                expires: expirationdate,
                signingCredentials: signinCredentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return token;
        }

        private async Task<IList<Claim>> GetUserClaims(ApplicationUser user)
        {
            var claims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);

            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Nbf, DateTime.Now.ToString()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()));

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
                claims.Add(new Claim("roles", role));
            }

            return claims;
        }

        public async Task<bool> AddRole(Guid userId,  string roleName)
        {
            var identityUser = await _userManager.FindByIdAsync(userId.ToString());
            if (identityUser == null)
                return false;

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (roleExists == false) return false;

            var result = await _userManager.AddToRoleAsync(identityUser, roleName);
            if (result.Succeeded)
                return true;

            return false;
        }

        public async Task<IList<string>> GetUserRoles(ApplicationUser applicationUser)
        {
            return await _userManager.GetRolesAsync(applicationUser);
        }

        public async Task<IList<string>> GetUsers()
        {
            return await _userManager.Users.Select(u => $"{u.Id} - {u.Email}").ToListAsync();
        }
    }
}
