using System.ComponentModel.DataAnnotations;

namespace ProjetoKanbangelo_API.Models
{
public class Lista
    {
        [Key]
        public string Title { get; set; }
        public int listaID { get; set; }
        public bool Creatable { get; set; }
        public bool Done { get; set; }
    }
}