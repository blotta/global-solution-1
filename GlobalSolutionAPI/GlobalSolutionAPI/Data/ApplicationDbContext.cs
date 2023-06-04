﻿using GlobalSolutionAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GlobalSolutionAPI.Contexts
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // builder.Entity<IdentityRole>().HasData(
            //     new IdentityRole(Constants.Roles.Admin),
            //     new IdentityRole(Constants.Roles.Manager)
            // );

            builder.Entity<Address>()
                .HasKey("Id")
                ;

            builder.Entity<Address>()
                .HasOne(address => address.User)
                ;

            builder.Entity<ApplicationUser>()
                .HasMany<Address>()
                ;

        }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}
