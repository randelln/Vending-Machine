using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VendingMachine.Models;
using VendingMachine.Services;
using Microsoft.AspNetCore.Cors;

namespace VendingMachine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    
    [EnableCors("ReactPolicy")]
    public class VMController : ControllerBase
    {
      
        private readonly CoinService coinService;
        private readonly ProductService productService;

        //Controller constructor
        public VMController( CoinService coinService, ProductService productService)
        {
            this.coinService = coinService;
            this.productService = productService;
        }

       // HTTP GET Request to get all coins
        [HttpGet("coins")]
        public IEnumerable<Coins> GetCoins()
        {
            return coinService.GetAll();
        }
        // HTTP GET Request to get all coins
        [HttpGet("products")]
        public IEnumerable<Product> GetProducts()
        {
            return productService.GetAll();
        }
        // HTTP GET Request to purchase a product
        [HttpGet("buy/{id}/{balance}")]
        public async Task<BuyResult> Put(int id, int balance)
        {
            Product product = productService.GetById(id);
           
            if (balance == 0)
            {
                BuyResult errBalBuyResult = new BuyResult
                {
                    Balance = 0,
                    Error = true,
                    ErrorMessage = "Balance cannot be 0"
                };
                return errBalBuyResult;
            }

            if(product == null)
            {
                BuyResult errProdBuyResult = new BuyResult
                {
                    Balance = 0,
                    Error = true,
                    ErrorMessage = "Product was not found"
                };
                return errProdBuyResult;
            }

            int remainBalance = balance - product.Price ;

            BuyResult successBuyResult = new BuyResult
            {
                Balance = remainBalance,
                Error = false,
                ErrorMessage = null,            
            };
            productService.Update(id);
            return successBuyResult;
        }

    }
}
