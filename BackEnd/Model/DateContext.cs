using Microsoft.EntityFrameworkCore;
using Npgsql;
using static BackEnd.Model.Record;

namespace BackEnd.Model
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DataContext()
        {
            NpgsqlConnection.GlobalTypeMapper.MapEnum<CurrencySelection>();
        }
        public DbSet<Record>? RecordsList { get; set; }
        public DbSet<PersonalInfo>? PersonalInfo { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<PersonalInfo>().HasData(
                new PersonalInfo
                {
                    Id=1,
                    Name = "Patrick",
                    Surname = "Bateman",
                    Birthday = DateTime.UtcNow
                });
        }
    }
}