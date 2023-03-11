using EmpowerID.EMS.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpowerID.EMS.Service.IRepository
{
    public interface IDepartmentRepository
    {
        public Task<List<Department>> GetDepartmentsAsync();
        public Task<List<Department>> GetDepartmentAsync(int DepartmentID);
        public Task<bool> AddDepartment(Department Department);
        public Task<bool> UpdateDepartment(Department Department);
        public Task<bool> DeleteDepartment(int DepartmentID);
    }
}
