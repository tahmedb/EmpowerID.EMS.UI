
using EmpowerID.EMS.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpowerID.EMS.Data
{
    public class EMSDbContext : DbContext
    {
        protected override void OnConfiguring
       (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "EMSDbContext");
        }
        public DbSet<Employee>  Employees{ get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<DepartmentEmployee> MyProperty { get; set; }

    }
}
