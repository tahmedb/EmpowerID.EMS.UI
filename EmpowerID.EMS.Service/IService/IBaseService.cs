namespace EmpowerID.EMS.Service.IService
{
    public interface IBaseService<TEntity>
    {
        public Task<List<TEntity>> GetAsync();
        public Task<List<TEntity>> SearchAsync(string term);
        public Task<TEntity> GetAsync(int Id);
        public Task<bool> Add(TEntity entity);
        public Task<bool> Update(TEntity entity);
        public Task<bool> Delete(int id);
    }
}
