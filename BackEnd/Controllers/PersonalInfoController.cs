using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using BackEnd.Model;
using static BackEnd.Model.PersonalInfo;
using Microsoft.EntityFrameworkCore;
namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonalInfoController:ControllerBase
    {
        private readonly DataContext _context;

        public PersonalInfoController(DataContext context)
        {
            _context = context;
        }
         [HttpGet]
        public IActionResult GetPersonalInfo()
        {
            var personalInfo = _context.PersonalInfo!.AsQueryable();
            return Ok(personalInfo);
        } 
        [HttpGet("{id}")]
        public IActionResult GetDetails(int? id)
        {
            var exercise = _context.PersonalInfo?.FirstOrDefault(e => e.Id == id);
            if (exercise == null)
            {
                return NotFound();
            }

            return Ok(exercise);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int? id, PersonalInfo PersonalInfo)
        {
           

            _context.Update(PersonalInfo);
            _context.SaveChanges();
            return Ok();
        } 
    }
}