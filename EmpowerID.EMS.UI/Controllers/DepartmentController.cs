using EmpowerID.EMS.Data.Models;
using EmpowerID.EMS.Service.IRepository;
using EmpowerID.EMS.Service.IService;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmpowerID.EMS.UI.Controllers
{

    public class DepartmentController : CrudController<Department, IDepartmentService>
    {
        public DepartmentController(IDepartmentService service) : base(service)
        {
        }
    }
}
