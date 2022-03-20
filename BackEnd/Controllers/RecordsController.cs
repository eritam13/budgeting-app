using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using BackEnd.Model;
using static BackEnd.Model.Record;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
        public IActionResult GetRecords([FromQuery] CurrencySelection? currency)
        {

            var records = _context.RecordsList!.AsQueryable();
            if (currency.HasValue)
            {
                records = records.Where(x => x.Currency == currency.Value);
            }

            return Ok(records);
        }   

        [HttpGet("{id}")]
        public IActionResult GetDetails(string? id)
        {
            var record = _context.RecordsList?.FirstOrDefault(e => e.Id == id);
            if (record == null)
            {
                return NotFound();
            }

            return Ok(record);
        }
        [Route("report")]
        [HttpGet]
        public IActionResult GetReport()
        {
            List<Report> totalReport = new List<Report>();
            Dictionary<string,decimal> report = new Dictionary<string,decimal>()
            {
                {"FoodDrinks",0},
                {"Shopping",0},
                {"Housing",0},
                {"Transportation",0},
                {"Income",0},
                {"Investments",0},
                {"Entertainment",0},
                {"Other",0}
            };
            foreach(var r in _context.RecordsList!)
            {
                if(report.ContainsKey(r.Category.ToString()))
                {
                    report[r.Category.ToString()] +=r.Amount;
                }
                Console.WriteLine(report[r.Category.ToString()]);
            }
            foreach(KeyValuePair<string, decimal> r in report)
            {
                    var a = Math.Round(r.Value*100)/100;
                    var b = r.Key;
                    totalReport.Add(new Report(){Category=b,Amount=a});
            }
            return Ok(totalReport);
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
        [HttpDelete]
        public IActionResult Delete()
        {
            _context.RecordsList?.RemoveRange(_context.RecordsList!);
            _context.SaveChanges();
            return NoContent();
        }
        [HttpPut("{id}")]
        public IActionResult Update(string? id, [FromBody] BackEnd.Model.Record record)
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