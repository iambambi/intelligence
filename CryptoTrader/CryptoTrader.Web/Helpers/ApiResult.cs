using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryptoTrader.Web.Helpers
{
    /// <summary>
    /// Defines the structure of the Api responses
    /// </summary>
    public class ApiResult
    {
        public string Message { get; set; }
        public object Data { get; set; }

        public static ApiResult Set(string message, object data = null) => new ApiResult() { Message = message, Data = data };
    }
}
