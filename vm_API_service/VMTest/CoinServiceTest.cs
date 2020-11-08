using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using VendingMachine.Controllers;
using VendingMachine.Models;
using VendingMachine.Services;

namespace VMTest
{
    [TestClass]
    public class CoinServiceTest
    {   
        [TestMethod]
        public void GetAllProducts_ShouldReturnAllCoins()
        {
            var coinService = new CoinService();
            var result = coinService.GetAll() as List<Coins>;
            Assert.AreEqual(result.Count, 4);
            Assert.AreEqual(result[1].name, "R2");
        }
    }
}
