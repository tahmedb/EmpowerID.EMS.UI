﻿using EmpowerID.EMS.Data.Models;
using EmpowerID.EMS.Service.IRepository;
using EmpowerID.EMS.Service.IService;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmpowerID.EMS.UI.Controllers
{

    public class EmployeeController : CrudController<Employee, IEmployeeService>
    {
        public EmployeeController(IEmployeeService service) : base(service)
        {
        }
    }
}
