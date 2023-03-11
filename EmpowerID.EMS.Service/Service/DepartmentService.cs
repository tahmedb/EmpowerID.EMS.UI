using EmpowerID.EMS.Data.Models;
using EmpowerID.EMS.Service.IRepository;
using EmpowerID.EMS.Service.IService;
using EmpowerID.EMS.Service.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmpowerID.EMS.Service.Service
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;
        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }
        public async Task<bool> Add(Department entity)
        {
            try
            {
                return await _departmentRepository.AddDepartmentAsync(entity);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while creating record", ex);
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                return await _departmentRepository.DeleteDepartmentAsync(id);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while deleting record", ex);
                return false;
            }
        }

        public async Task<List<Department>> GetAsync()
        {
            try
            {
                return await _departmentRepository.GetDepartmentsAsync();
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while deleting record", ex);
                throw;
            }
        }

        public  async Task<Department> GetAsync(int Id)
        {
            try
            {
                return await _departmentRepository.GetDepartmentAsync(Id);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while retrieving record", ex);
                throw;
            }
        }

        public async Task<List<Department>> SearchAsync(string term)
        {
            try
            {
                return await _departmentRepository.SearchDepartmentAsync(term);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while search record", ex);
                throw;
            }
        }

        public async Task<bool> Update(Department entity)
        {
            try
            {
                return await _departmentRepository.UpdateDepartmentAsync(entity);
            }
            catch (Exception ex)
            {
                LogHelper.Error("Error while creating record", ex);
                throw;
            }
        }
    }
}
