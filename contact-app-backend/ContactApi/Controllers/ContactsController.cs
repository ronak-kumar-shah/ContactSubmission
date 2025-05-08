using ContactApi.Data;
using ContactApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ContactsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        // GET: api/contacts/getcontacts
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetContacts")]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _dbContext.Contacts.ToListAsync();
            return Ok(contacts);
        }

        // POST: api/contacts/createcontact
        /// <summary>
        /// 
        /// </summary>
        /// <param name="contact"></param>
        /// <returns></returns>
        [HttpPost("CreateContact")]
        public async Task<IActionResult> CreateContact([FromBody] Contact contact)
        {
            if (string.IsNullOrWhiteSpace(contact.Name) ||
                string.IsNullOrWhiteSpace(contact.Email) ||
                string.IsNullOrWhiteSpace(contact.Phone))
            {
                return BadRequest("All fields are required.");
            }

            _dbContext.Contacts.Add(contact);
            await _dbContext.SaveChangesAsync();
            return Ok(contact);
        }
    }
}
