
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using BackEnd.Model;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Primitives;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
namespace WorkoutApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly DataContext _context;
        private IConfiguration _config;
        public class JwtOptions
        {
            public string? SecretKey { get; set; }
            public int ExpiryMinutes { get; set; }
            public string? Issuer { get; set; }        
        }
        public UsersController(IConfiguration config, DataContext context)
        {
            _config = config;
            _context = context;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var dbUser = _context.UserList!.FirstOrDefault(user => user.Username == login.Username);

            if (dbUser == null) return NotFound();

            if (dbUser.Password != HashPassword(login.Password)) return Unauthorized();

            var token = GenerateJSONWebToken(dbUser);

            return Ok(new {token = token});

        }
        [HttpPost("Register")]
        public IActionResult Register([FromBody] User register)
        {
            var dbUser = _context.UserList!.FirstOrDefault(user => user.Username==register.Username);
            if (dbUser !=null || register.Password =="" || register.Username=="") return BadRequest();
            register.Password=HashPassword(register.Password);
            _context.UserList!.Add(register);
            _context.SaveChanges();
            var token = GenerateJSONWebToken(register);
            return Ok(new {token = token});
        }

        private string HashPassword(string password)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: new byte[0],
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
        private string GenerateJSONWebToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(10),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
