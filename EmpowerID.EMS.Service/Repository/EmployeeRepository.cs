using EmpowerID.EMS.Data;
using EmpowerID.EMS.Data.Models;
using EmpowerID.EMS.Service.IRepository;
using Microsoft.EntityFrameworkCore;

namespace EmpowerID.EMS.Service.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        DataContext _dbContext;
        public EmployeeRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddEmployeeAsync(Employee employee)
        {
            try
            {
                _dbContext.Add(employee);
                await _dbContext.SaveAsync();
                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while creating employee", ex);
                throw;
            }
        }

        public async Task<bool> DeleteEmployeeAsync(int employeeID)
        {
            var employee = await GetEmployeeAsync(employeeID);
            _dbContext.Remove<Employee>(employee);
            await _dbContext.SaveAsync();
            return true;
        }

        public async Task<Employee> GetEmployeeAsync(int employeeID)
        {
            return await _dbContext.Query<Employee>().Include(x => x.department).FirstAsync(x => x.Id == employeeID);
        }

        public async Task<List<Employee>> GetEmployeesAsync()
        {
            return await _dbContext.Query<Employee>().Include(x=>x.department).ToListAsync();
        }

        public async Task<List<Employee>> SearchEmployeeAsync(string term)
        {
            return await _dbContext.Query<Employee>().Where(x =>
            !string.IsNullOrEmpty(x.FirstName) && x.FirstName.Contains(term) ||
            !string.IsNullOrEmpty(x.LastName) && x.LastName.Contains(term)
            ).ToListAsync();
        }

        public async Task<bool> UpdateEmployeeAsync(Employee employee)
        {
            _dbContext.Update<Employee>(employee);
            await _dbContext.SaveAsync();
            return true;
        }
    }
}
