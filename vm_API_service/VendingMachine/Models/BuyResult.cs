using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VendingMachine.Models
{
    public class BuyResult
    {
        public int Balance { get; set; }
        public bool Error { get; set; }
        public string ErrorMessage { get; set; }
        public int Quantity { get; set;}
    }
}
