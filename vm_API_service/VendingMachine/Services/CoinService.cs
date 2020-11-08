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
        private static readonly string[] coinName = new string[] { "R1", "R2", "R5", "R10"};
        private static readonly int[] coinAmount = new int[] { 10, 2, 3, 9,  };
        private static readonly int[] coinValue = new int[] { 1, 2, 5, 10};


        static CoinService()
        {
            Random rnd = new Random();

            for(int i = 0; i < 4; i++)
            {
                Coins coin = new Coins
                {
                    name = coinName[i],
                    value = coinValue[i],
                    amount = (rnd.Next(3,10))
                };
                coins.Add(coin);
            }
        }

        public List<Coins> GetAll()
        {
            return coins;
        }

    }
}
