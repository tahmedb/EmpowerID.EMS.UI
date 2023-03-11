using EmpowerID.EMS.Data.Models;

namespace EmpowerID.EMS.Service.IRepository
{
    public interface IEmployeeRepository
    {
        public Task<List<Employee>> GetEmployeesAsync();
        public Task<Employee> GetEmployeeAsync(int employeeID);
        public Task<bool> AddEmployeeAsync(Employee employee);
        public Task<bool> UpdateEmployeeAsync(Employee employee);
        public Task<bool> DeleteEmployeeAsync(int employeeID);
    }
}
