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
    public class LoginController : Controller
    {
        private readonly KanbangeloContext _context;
        public LoginController(KanbangeloContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Usuario>> GetAll()
        {
            return _context.Usuario.ToList();
        }

        [HttpPost("Login")]
        public ActionResult<List<Usuario>> Get([FromBody]Usuario usuario)
        {
            try
            {
                var result = _context.Usuario.Where(user => usuario.Nome == user.Nome).ToList();
                if (result == null)
                {
                    return NotFound();
                }
                foreach (var item in result)
                {
                    if(item.Senha == usuario.Senha)
                    {
                        return Ok(result);
                    }
                }
                return this.StatusCode(StatusCodes.Status500InternalServerError, "A senha esta incorreta");
            }
                catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Usuario model)
        {
            try
            {
                _context.Usuario.Add(model);
                    if (await _context.SaveChangesAsync() == 1)
                    {
                        //return Ok();
                        return Created($"/api/usuario/{model.Nome}",model);
                    }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

    }
}