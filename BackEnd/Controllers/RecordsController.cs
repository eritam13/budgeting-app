using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using BackEnd.Model;
using static BackEnd.Model.Record;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecordsController : ControllerBase
    {
        private readonly DataContext _context;

        public RecordsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetRecords([FromQuery] string? currency)
        {

            var records = _context.RecordsList!.AsQueryable();
            if (currency is not null)
            {
                records = records.Where(x => x.Currency == currency);
            }

            return Ok(records);
        }   

        [HttpGet("{id}")]
        public IActionResult GetDetails(int? id)
        {
            var record = _context.RecordsList?.FirstOrDefault(e => e.Id == id);
            if (record == null)
            {
                return NotFound();
            }

            return Ok(record);
        }

        [HttpPost]
        public IActionResult Create([FromBody] BackEnd.Model.Record record)
        {
            var dbRecord = _context.RecordsList?.Find(record.Id);
            if (dbRecord == null) 
            {
                _context.Add(record);
                 _context.SaveChanges();
                 
                 return CreatedAtAction(nameof(GetDetails), new { Id = record.Id }, record);
            }
            else
            {
                return Conflict();
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int? id, [FromBody] BackEnd.Model.Record record)
        {
            if (id != record.Id || !_context.RecordsList!.Any(e => e.Id == id))
            {
                return NotFound();
            }

            _context.Update(record);
            _context.SaveChanges();

            return NoContent();
        }
    }
}