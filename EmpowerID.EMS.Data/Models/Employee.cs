using System.ComponentModel.DataAnnotations;

namespace EmpowerID.EMS.Data.Models
{
    public class Employee : BaseModelObject
    {
        [MaxLength(30)]
        public string FirstName { get; set; }
        [MaxLength(30)]
        public string LastName { get; set; }
        public string Address { get; set; }
        [MaxLength(50)]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int Salary { get; set; }
    }
}