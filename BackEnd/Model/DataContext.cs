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
        public DbSet<User>? UserList { get; set; }
        public DbSet<Record>? RecordsList { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Record>().HasData(
            new Record{
                Id="safdasfd",
                Activity="asdf",
                Currency=CurrencySelection.EUR,
                User="t",
                Category=CategorySelection.Entertainment,
                Amount=20M,
                Time="20:20",
                Date=DateTime.UtcNow
            });
            modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "test1",
                // parool on test1
                Password = "St9tpNN2zrinRGNUgKWCy4JjZRFEorSQ0Zg3a/8m7k4="
            },
            new User
            {
                Id = 2,
                Username = "test2",
                Password = "zWoe4T9h2Hj9G4dyUtWwcKwV6zMR1Q0yr3Uch+xSze8=" // test2
            },
            new User
            {
                Id = 3,
                Username = "test3",
                Password = "6RwNz8ehCp0yZ0KkUE7i+Shy+2l7C1Eh9dT/RULwZN8=" // test3
            }
             );

        }
    }
}