using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace CryptoTrader.Web.Helpers
{
    public class TokenHandler
    {
        #region Contants

        private const string FacebookTokenValidationUrl = "https://graph.facebook.com/v2.4/me/?access_token=";

        #endregion

        private static HttpClient Client { get; set; } = new HttpClient();

        public async Task<bool> Validate(string token, string socialMedia)
        {
            string URL = String.Empty;

            // Validate the socal media and create token validator url
            if (socialMedia == "facebook")
                URL = FacebookTokenValidationUrl + token;
            else
                return false;

            // Gets the response
            var responseMessage = await Client.GetAsync(URL);

            return responseMessage.IsSuccessStatusCode;
        }
    }
}
