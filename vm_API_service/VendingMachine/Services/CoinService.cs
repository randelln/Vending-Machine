using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VendingMachine.Models;

namespace VendingMachine.Services
{
    public class CoinService
    {
        private static List<Coins> coins = new List<Coins>();
     

      
        static CoinService()
        {
            Coins coin1 = new Coins
            {
                value = 1,
                name = "R1",
                amount = 3
                
            };

            Coins coin2 = new Coins
            {
                value = 2,
                name = "R2",
                amount = 7
            };

            Coins coin3 = new Coins
            {
                value = 5,
                name = "R5",
                amount = 3
            };

            Coins coin4 = new Coins
            {
                value = 10,
                name = "R10",
                amount = 5
            };

            coins.Add(coin1);
            coins.Add(coin2);
            coins.Add(coin3);
            coins.Add(coin4);



        }

        public List<Coins> GetAll()
        {
            return coins;
        }

    }
}
