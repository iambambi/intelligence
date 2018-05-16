using CryptoTrader.EntityDomain.Entities;
using CryptoTrader.Services.Interfaces;
using CryptoTrader.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CryptoTrader.Web.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        public IUserService UserService { get; private set; }

        public AccountController(IUserService userService)
        {
            UserService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User model)
        {
            var userFromDb = UserService.GetById(model.Id);

            if (userFromDb == null)
            {
                var user = new User()
                {
                    Id = model.Id,
                    UserName = model.UserName,
                    Email = model.Email,
                    SocialMedia = model.SocialMedia
                };

                user = await UserService.Create(user);

                return Ok(ApiResult.Set("User added to database.", Json(new { userId = user.Id })));
            }

            return Ok(ApiResult.Set("Existing user fetched from database.", Json(new { userId = userFromDb.Id })));
        }
    }
}