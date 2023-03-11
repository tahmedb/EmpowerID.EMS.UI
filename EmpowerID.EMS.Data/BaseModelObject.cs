namespace EmpowerID.EMS.Data
{
    public class BaseModelObject
    {
        public int Id { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public bool IsArchive { get; set; }
    }
}