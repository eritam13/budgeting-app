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
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasPostgresEnum<CurrencySelection>();
            modelBuilder.Entity<Record>().HasData(
                new Record
                {
                    Id = 1,
                    Activity = "Bought bread",
                    Description = "went to maxima and bought bread",
                    Date = DateTime.UtcNow,
                    Currency = CurrencySelection.EUR,
                    Amount = 10
                });
        }
    }
}