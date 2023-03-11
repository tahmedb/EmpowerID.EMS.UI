namespace EmpowerID.EMS.Data.Models
{
    public class Department : BaseModelObject
    {
        public string DepartmentName { get; set; }
        public List<Employee>? employees { get; set; }

    }
}