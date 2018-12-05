using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using System;
using System.Collections.Generic;
using System.Text;

namespace AutoTrader
{
    public static class AutoTrader
    {
        #region Contants

        private const string CryptoAPIUrl = "https://obudai-api.azurewebsites.net/api/exchange";
        private const string CryptoPurchaseUrl = "https://obudai-api.azurewebsites.net/api/account/purchase";
        private const string CryptoAccountUrl = "https://obudai-api.azurewebsites.net/api/account";

        #endregion

        [FunctionName("Trader")]
        public static void Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, TraceWriter log)
        {
            // Http helper methods:
            // GET: HttpHelpers.GetAsync(URI); => return string
            // POST: HttpHelpers.PostAsync("URI","data","type","POST"); => return string

            //List<DateTime> listtoday = new List<DateTime>();
            //foreach (var item in historydates)
            //{
            //    if (item = DateTime.Now)
            //    {
            //        listtoday.Add(item);
            //    }
            //}

            //var avg = listtoday.value.Avarge();
            //if (avg < currentPrice)
            //{
            //    Buy(0, 1);
            //}
            //else
            //{
            //    return false;
            //}

        log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
        }
    }
}
