using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
namespace BackEnd.Model
{
    public record Record
    {
        [Column("id")]
        public int Id { get; init; }
        [Column("activity")]
        public string? Activity { get; init;}
        [Column("description")]
        public string? Description { get; init; }
        [Column("date")]
        public DateTime? Date { get; init; }
        [Column("currency")]
        public string? Currency { get; init; }
        [Column("amount")]
        public decimal? Amount { get; init; }

    }
}