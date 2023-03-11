using EmpowerID.EMS.Data;
using EmpowerID.EMS.Data.Models;
using EmpowerID.EMS.Service.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpowerID.EMS.Service.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        DataContext _dbContext;
        public EmployeeRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddEmployee(Employee employee)
        {
            try
            {
                _dbContext.Add(employee);
                await _dbContext.SaveAsync();
                return true;
            }catch(Exception ex)
            {
                LogHelper.Error(ex);
                return false;
            }
        }

        public Task<bool> DeleteEmployee(int employeeID)
        {
            throw new NotImplementedException();
        }

        public Task<List<Employee>> GetEmployeeAsync(int employeeID)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Employee>> GetEmployeesAsync()
        {
            return await _dbContext.Query<Employee>().ToListAsync();
        }

        public Task<bool> UpdateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
