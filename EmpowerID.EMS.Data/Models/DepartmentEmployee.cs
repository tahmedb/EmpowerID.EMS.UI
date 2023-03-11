namespace EmpowerID.EMS.Data.Models
{
    public class DepartmentEmployee : BaseModelObject
    {
        public int EmployeeId { get; set; }
        public int DepartmentId { get; set; }

        public Employee Employee { get; set; }
        public Department? Department { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}