using EmpowerID.EMS.Data.Models;

namespace EmpowerID.EMS.Service.IRepository
{
    public interface IDepartmentRepository 
    {
        public Task<List<Department>> GetDepartmentsAsync();
        public Task<Department> GetDepartmentAsync(int departmentId);
        public Task<List<Department>> SearchDepartmentAsync(string term);
        public Task<bool> AddDepartmentAsync(Department department);
        public Task<bool> UpdateDepartmentAsync(Department department);
        public Task<bool> DeleteDepartmentAsync(int departmentId);
    }
}
