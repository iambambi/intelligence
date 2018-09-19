using CryptoTrader.Services.Interfaces;
using CryptoTrader.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryptoTrader.Web.Controllers
{
    [Route("api/trade")]
    public class TradeController : Controller
    {
        ITradeService TradeService { get; set; }
        TokenHandler _tokenHandler { get; set; } = new TokenHandler();

        public TradeController(ITradeService tradeService)
        {
            TradeService = tradeService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create()
        {
            var token = Request.Headers["Token"].ToString();
            var provider = Request.Headers["Token-Provider"].ToString();

            // Access check
            if (!await _tokenHandler.Validate(token, provider))
                return BadRequest(ApiResult.Set("Token validation failed."));

            var userIdentifier = Request.Form["UserId"].ToString();
            var currencyIdentifier = Request.Form["CurrencyId"].ToString();

            // logic

            return Ok(ApiResult.Set("Trade created successfully.", Json(new { TODO = "TODO" })));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Reset()
        {
            var token = Request.Headers["Token"].ToString();
            var provider = Request.Headers["Token-Provider"].ToString();

            // Access check
            if (!await _tokenHandler.Validate(token, provider))
                return BadRequest(ApiResult.Set("Token validation failed."));

            var userIdentifier = Request.Form["UserId"].ToString();
            var currencyIdentifier = Request.Form["CurrencyId"].ToString();

            // logic

            return Ok(ApiResult.Set("Trade created successfully.", Json(new { TODO = "TODO" })));
        }
    }
}
