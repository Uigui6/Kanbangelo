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
    public class ListaController : Controller
    {
        private readonly KanbangeloContext _context;
        public ListaController(KanbangeloContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Lista>> GetAll()
        {
            return _context.Lista.ToList();
        }

    }
}