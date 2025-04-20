using Microsoft.AspNetCore.Mvc;
using SimpleApp.Models;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SimpleApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    private static readonly List<User> Users = new();

    [HttpPost]
    public IActionResult Register([FromBody] User user)
    {
        if (string.IsNullOrWhiteSpace(user.Name) || user.Name.Length < 6)
        {
            return BadRequest(new
            {
                status = "error",
                message = "Name must be at least 6 characters long and not empty."
            });
        }

        if (!IsValidPassword(user.Password))
        {
            return BadRequest(new
            {
                status = "error",
                message = "Password must be at least 6 characters long and include uppercase, lowercase and a number."
            });
        }

        Users.Add(user);
        return Created("", new { message = "User created!" });
    }

    private bool IsValidPassword(string password)
    {
        return password.Length >= 6 &&
               Regex.IsMatch(password, "[A-Z]") &&
               Regex.IsMatch(password, "[a-z]") &&
               Regex.IsMatch(password, "[0-9]");
    }
}
