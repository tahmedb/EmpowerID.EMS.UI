using EmpowerID.EMS.Data.Models;
using EmpowerID.EMS.Service.IRepository;
using EmpowerID.EMS.Service.IService;
using EmpowerID.EMS.Service.Repository;

namespace EmpowerID.EMS.Service.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IDepartmentRepository _departmentRepository;
        public EmployeeService(IEmployeeRepository employeeRepository, IDepartmentRepository departmentRepository)
        {
            _employeeRepository = employeeRepository;
            _departmentRepository = departmentRepository;
        }
        public async Task<bool> Add(Employee entity)
        {
            try
            {
                return await _employeeRepository.AddEmployeeAsync(entity);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while creating record", ex);
                throw;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                return await _employeeRepository.DeleteEmployeeAsync(id);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while deleting record", ex);
                return false;
            }
        }

        public async Task<List<Employee>> GetAsync()
        {
            try
            {
                return await _employeeRepository.GetEmployeesAsync();
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while deleting record", ex);
                throw;
            }
        }

        public  async Task<Employee> GetAsync(int Id)
        {
            try
            {
                return await _employeeRepository.GetEmployeeAsync(Id);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while retrieving record", ex);
                throw;
            }
        }

        public async Task<List<Employee>> SearchAsync(string term)
        {
            try
            {
                return await _employeeRepository.SearchEmployeeAsync(term);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while search record", ex);
                throw;
            }
        }

        public async Task<bool> Update(Employee entity)
        {
            try
            {
                return await _employeeRepository.UpdateEmployeeAsync(entity);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while creating record", ex);
                throw;
            }
        }
    }
}
