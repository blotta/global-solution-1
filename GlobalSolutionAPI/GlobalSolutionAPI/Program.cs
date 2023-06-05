using GlobalSolutionAPI.Constants;
using GlobalSolutionAPI.Contexts;
using GlobalSolutionAPI.Models;
using GlobalSolutionAPI.PolicyRequirements;
using GlobalSolutionAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    // string connStr = builder.Configuration.GetConnectionString("Default");
    // var serverVersion = ServerVersion.Parse("8.0.21"); // ServerVersion.AutoDetect(connStr)
    // options.UseMySql(connStr, serverVersion);
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>
    (options =>
{
    options.Password.RequiredLength = 5;
    options.User.RequireUniqueEmail = true;
    options.SignIn.RequireConfirmedEmail = false;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var issuer = builder.Configuration.GetSection("Jwt:Issuer").Value;
    var audience = builder.Configuration.GetSection("Jwt:Audience").Value;
    Console.WriteLine($"Issuer from confing: {issuer}");
    Console.WriteLine($"Audience from confing: {audience}");

    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
    {
        ValidateActor = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        RequireExpirationTime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Value,
        ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Value,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:Key").Value))
    };
});

builder.Services.AddSingleton<IAuthorizationHandler, HasAddressHandler>();
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(Policies.HasAddress, policy => policy.Requirements.Add(new HasAddressRequirement()));

    options.AddPolicy("IsAdmin", policy => policy.RequireRole(Roles.Admin));
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Application services
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IUserService, UserService>();

//
builder.Services.AddCors();

builder.Services.AddControllers()
    .AddJsonOptions(opt => { opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

var _logger = app.Services.GetService<ILogger<Program>>();

var issuer = builder.Configuration.GetSection("Jwt:Issuer").Value;
var audience = builder.Configuration.GetSection("Jwt:Audience").Value;
var dbconn = builder.Configuration.GetConnectionString("DefaultConnection");
_logger.LogError($"Issuer from config: {issuer}");
_logger.LogError($"Audience from config: {audience}");
_logger.LogError($"dbConnString from config: {dbconn}");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
}
else
{
    app.UseCors(c => c
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithOrigins(builder.Configuration.GetSection("Cors").Value));

    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
