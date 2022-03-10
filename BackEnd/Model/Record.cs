using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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
        public CurrencySelection Currency { get; init; }
        [Column("amount")]
        public decimal? Amount { get; init; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum CurrencySelection{ 
            USD =1,
            EUR =2
        }

    }
}