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

        [Column("id"), Required]
        public string Id { get; init; } = Guid.NewGuid().ToString();
        [Column("activity"),Required]
        public string? Activity { get; init;}
        [Column("description")]
        public string? Description { get; init; }
        [Column("date"),Required]        public DateTime? Date { get; init; }

        [Column("currency"),Required]
        public CurrencySelection Currency { get; init; }
        [Column("amount"),Required]
        public decimal Amount { get; init; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum CurrencySelection{ 
            USD =1,
            EUR =2
        }
        [Column("category"),Required]
        public CategorySelection Category {get; init; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum CategorySelection{ 
            [Display(Name="Food & Drinks")]
            FoodDrinks =1,
            Shopping =2,
            Housing = 3,
            Transportation = 4,
            Income = 5,
            Investments=6,
            Entertainment=7,
            Other=8
        }
    }
}