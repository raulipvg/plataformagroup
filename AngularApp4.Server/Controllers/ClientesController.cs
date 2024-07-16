using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularApp4.Server.Models;
using AngularApp4.Server.Models.DTO;
using Microsoft.Data.SqlClient;
using NuGet.Protocol;
using System.Data;

namespace AngularApp4.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;



        public ClientesController(ApplicationDbContext context)
        {
            _context = context;
        }



        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteDTO>>> GetClientes()
        {
            //return await _context.Cliente.ToListAsync();
            List<ClienteDTO> clientes = await _context.Cliente
                                                    .Include(c => c.Pais)
                                                    .Select(
                                                        c => new ClienteDTO
                                                        {
                                                            Id = c.Id,
                                                            Rut = c.Rut,
                                                            Nombre = c.Nombre,
                                                            Apellido = c.Apellido,
                                                            Direccion = c.Direccion,
                                                            Email = c.Email,
                                                            Telefono = c.Telefono,
                                                            Pais = c.Pais.Nombre
                                                        }       )
                                                    .OrderBy(c => c.Apellido)
                                                    .ThenBy(c => c.Nombre)
                                                    .ToListAsync();
            return clientes;

        }

        // GET DESDE PRODECIMIENTO ALMACENADO
        [HttpGet("GetClientes2")]
        public async Task<ActionResult<IEnumerable<ClienteDTO>>> GetClientes2(int pageIndex =1 )
        {
            // ejecutar procedimiento almacena llamado sp_ObtenerClientes
            // y pasar el parámetro @PageIndex

            List<ClienteDTO> clientes = new List<ClienteDTO>();

            string connectionString = _context.Database.GetDbConnection().ConnectionString;


            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("sp_ObtenerClientes", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@PageIndex", SqlDbType.Int) { Value = pageIndex });
                connection.Open();
                SqlDataReader reader = await command.ExecuteReaderAsync();

                if (reader.HasRows)
                {
                    while (await reader.ReadAsync())
                    {
                        ClienteDTO cliente = new ClienteDTO
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Rut = reader.GetString(reader.GetOrdinal("Rut")),
                            Nombre = reader.GetString(reader.GetOrdinal("Nombre")),
                            Apellido = reader.GetString(reader.GetOrdinal("Apellido")),
                            Direccion = reader.GetString(reader.GetOrdinal("Direccion")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            Telefono = reader.GetString(reader.GetOrdinal("Telefono")),
                            Pais = reader.GetString(reader.GetOrdinal("Pais"))
                        };

                        clientes.Add(cliente);
                    }
                }

                reader.Close();
            }

            return clientes;
        }
    }

   
}
