using Microsoft.EntityFrameworkCore;
using ProjetoKanbangelo_API.Models;

namespace ProjetoKanbangelo_API.Data
{
    public class KanbangeloContext: DbContext
        {
            public KanbangeloContext(DbContextOptions<KanbangeloContext> options): base (options)
            {
                
            }
            public DbSet<Usuario> Usuario {get; set;}
            public DbSet<Lista> Lista {get; set;}
            public DbSet<Ideia> Ideia {get; set;}
        }
}