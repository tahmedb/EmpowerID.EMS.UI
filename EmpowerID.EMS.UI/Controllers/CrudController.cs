using EmpowerID.EMS.Data.Models;
using EmpowerID.EMS.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace EmpowerID.EMS.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CrudController<TEntity, TService> : ControllerBase where TService : IBaseService<TEntity>
    {
        private readonly TService _service;
        public CrudController(TService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ResponseModel> Get()
        {
            var standardResponse = new ResponseModel { Message = "List of record" };
            try
            {
                var result = await _service.GetAsync();
                standardResponse.Result = result;
                return standardResponse;
            }
            catch (Exception ex)
            {
                standardResponse.Message = ex.Message;
                return standardResponse;
            }
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ResponseModel> Get(int id)
        {
            var standardResponse = new ResponseModel { Message = "Record by id" };
            try
            {
                var result = await _service.GetAsync(id);
                standardResponse.Result = result;
                return standardResponse;
            }
            catch (Exception ex)
            {
                standardResponse.Message = ex.Message;
                return standardResponse;
            }
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ResponseModel> Post([FromBody] TEntity value)
        {
            var standardResponse = new ResponseModel { Message = "Record Saved", Result = { } };
            try
            {
                await _service.Add(value);
                return standardResponse;
            }
            catch (Exception ex)
            {
                standardResponse.Message = ex.Message;
                return standardResponse;
            }           
        }

        // PUT api/<EmployeeController>/5
        [HttpPut]
        public async Task<ResponseModel> Put([FromBody] TEntity value)
        {
            var standardResponse = new ResponseModel { Message = "Record Updated", Result = { } };
            try
            {
                await _service.Update(value);
                return standardResponse;
            }
            catch (Exception ex)
            {
                standardResponse.Message = ex.Message;
                return standardResponse;
            }            
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ResponseModel> Delete(int id)
        {
            var standardResponse = new ResponseModel { Message = "Record Deleted", Result = { } };
            try
            {
                var result = await _service.Delete(id);
                return standardResponse;
            }
            catch (Exception ex)
            {
                standardResponse.Message = ex.Message;
                return standardResponse;
            }
        }
    }
}
