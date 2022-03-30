using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Model
{
    public class PersonalInfo
    {
        [Column("id")]
        public int? Id { get; init; } 
        [Column("name")]
        public string? Name { get; init;}

        [Column("surname")]
        public string? Surname{ get; init;}

        [Column("birthday")]
        public DateTime? Birthday { get; init; }
    }
}