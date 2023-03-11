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
    public class DepartmentRepository : IDepartmentRepository
    {
        DataContext _dbContext;
        public DepartmentRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> AddDepartmentAsync(Department Department)
        {
            try
            {
                _dbContext.Add(Department);
                await _dbContext.SaveAsync();
                return true;
            }
            catch (Exception ex)
            {
                LogHelper.Error(ex);
                return false;
            }
        }

        public async Task<bool> DeleteDepartmentAsync(int DepartmentID)
        {
            var Department = await GetDepartmentAsync(DepartmentID);
            _dbContext.Remove<Department>(Department);
            await _dbContext.SaveAsync();
            return true;
        }

        public async Task<Department> GetDepartmentAsync(int DepartmentID)
        {
            return await _dbContext.Query<Department>().FirstAsync(x => x.Id == DepartmentID);
        }

        public async Task<List<Department>> GetDepartmentsAsync()
        {
            return await _dbContext.Query<Department>().ToListAsync();
        }

        public async Task<bool> UpdateDepartmentAsync(Department Department)
        {
            _dbContext.Update<Department>(Department);
            await _dbContext.SaveAsync();
            return true;
        }
    }
}
