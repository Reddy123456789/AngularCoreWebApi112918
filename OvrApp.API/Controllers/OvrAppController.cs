using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using OvrApp.API.Data;
using OvrApp.API.Models;

namespace OvrApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OvrAppController : Controller
    {
        private readonly OvrAppContext _context;

       // private IMapper _mapper;

        // initiate database context
        public OvrAppController(OvrAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getAllEligibility")]
        public IEnumerable<Eligibility> GetAll()
        {
            // fetch all contact records 
            return _context.Eligibilitys.ToList();
        }

        [HttpGet]
        [Route("getEligibility")]
        public IActionResult GetById(long id)
        {
            // filter contact records by contact id
            var item = _context.Eligibilitys.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        [Route("addEligibility")]
        public IActionResult CreateEligibility([FromBody] Eligibility item)
        {
            // set bad request if contact data is not provided in body
            if (item == null)
            {
                return BadRequest();
            }

            var entity = new Eligibility();
            entity.IsCitizen = item.IsCitizen;
            entity.IsFelon = item.IsFelon;
            entity.IsMentalIncomp = item.IsMentalIncomp;
            entity.NewRegistration = item.NewRegistration;
            entity.RecordUpdate = item.RecordUpdate;
            entity.RequesttoReplace = item.RequesttoReplace;
            entity.DLNumber = item.DLNumber;
            entity.LastSSN = item.LastSSN;
            entity.IssueDate = item.IssueDate;
            entity.LastName = item.LastName;
            entity.Firstname = item.Firstname;
            entity.MiddleName = item.MiddleName;
            entity.Suffix = item.Suffix;
            entity.Dob = item.Dob;
            _context.Eligibilitys.Add(entity);
            _context.SaveChanges();
            item.Id = entity.Id;
            // Debug.WriteLine(" ID is " + entity.Id);

            // return Ok(entity);

            return Ok(entity);
        }

        [HttpPut("id")]
        [Route("updateContact")]
        public IActionResult Update(long id, [FromBody] Eligibility item)
        {
            // set bad request if contact data is not provided in body  
            if (item == null || id == 0)
            {
                return BadRequest();
            }
            var eligibility = _context.Eligibilitys.FirstOrDefault(t => t.Id == id);
            if (eligibility == null)
            {
                return NotFound();
            }
            eligibility.DLNumber = item.DLNumber;
            eligibility.Dob = item.Dob;
            eligibility.LastSSN = item.LastSSN;
            eligibility.IssueDate = item.IssueDate;
            eligibility.LastName = item.LastName;
            eligibility.Firstname = item.Firstname;
            eligibility.MiddleName = item.MiddleName;
          //  eligibility.Suffix = item.Suffix;
            _context.Eligibilitys.Update(eligibility);
            _context.SaveChanges();
            item.Id = eligibility.Id;
            return Ok(eligibility);
        }

    }
}