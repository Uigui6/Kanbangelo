using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoKanbangelo_API.Data;
using ProjetoKanbangelo_API.Models;

namespace ProjetoKanbangelo_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdeiaController : Controller
    {
        private readonly KanbangeloContext _context;
        public IdeiaController(KanbangeloContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Ideia>> GetAll()
        {
            return _context.Ideia.ToList();
        }

        [HttpGet("{nome}")]
        public ActionResult<List<Ideia>> Get(string nome)
        {
            try
            {
                var result = _context.Ideia.Where(i => i.Nome == nome).ToList();
                return Ok(result);
            }
                catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        
        [HttpPost]
        public ActionResult post([FromBody]Ideia ideia)
        {
            try
            {
                _context.Ideia.Add(ideia);
                _context.SaveChanges();
                return Ok();
            }
                catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}