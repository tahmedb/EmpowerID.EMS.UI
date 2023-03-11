namespace EmpowerID.EMS.Service.IRepository
{
    public interface IBaseRepository<TEntity>
    {
        public Task<List<TEntity>> GetAsync();
        public Task<List<TEntity>> GetAsync(int id);
        public Task<bool> Add(TEntity entity);
        public Task<bool> Update(TEntity entity);
        public Task<bool> Delete(int id);
    }
}
