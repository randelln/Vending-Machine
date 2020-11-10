using System.Collections.Generic;
using System.Linq;
using VendingMachine.Models;

namespace VendingMachine.Services
{
    public class ProductService
    {
        //Data structures used to pass on data
        private static List<Product> products = new List<Product>();
        private static int Count = 1;
        private static readonly string[] productName = new string[] { "Coke", "Fanta", "Sprite", "Lemon Twist", "Tab", "Pepsi", "Mountain Dew", "Lays", "Simba", "Energade" };
        private static readonly int[] productQuant = new int[] { 10, 2, 3, 9, 5, 8, 7, 12, 9, 11 };
        private static readonly int[] productPrice = new int[] { 10, 10, 10, 10, 10, 10, 8, 5, 5, 10 };
        private static readonly string[] productVolume = new string[] { "330ml", "330ml", "330ml", "500ml", "330ml", "500ml", "330ml", "33g", "33g", "500ml" };

        //Giving each product the relevant data
        static ProductService()
        {
            for (int i = 0; i < 10; i++)
            {
                Product product = new Product
                {
                    ID = Count++,
                    Name = productName[i],
                    Quantity = productQuant[i],
                    Price = productPrice[i],
                    Volume = productVolume[i]
                };
                products.Add(product);
            }
        }
        //Returning a list of products
        public List<Product> GetAll()
        {
            return products;
        }
        //Returns selected product
        public Product GetById(int id)
        {
            return products.Where(product => product.ID == id).FirstOrDefault();
        }
        //Updates product quantity
        public void Update(int id)
        {
            Product found = products.Where(n => n.ID == id).FirstOrDefault();
            found.Quantity -= 1;
        }

    }
}
