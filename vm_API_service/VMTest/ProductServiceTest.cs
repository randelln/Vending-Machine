using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using VendingMachine.Controllers;
using VendingMachine.Models;
using VendingMachine.Services;

namespace VMTest
{
    [TestClass]
    public class ProductServiceTest
    {
      
        [TestMethod]
        public void GetAllProducts_ShouldReturnAllProducts()
        {
            var productService = new ProductService();
            var result = productService.GetAll() as List<Product>;
            Assert.AreEqual(result.Count, 10);
            Assert.AreEqual(result[0].Name, "Coke");
        }

        [TestMethod]
        public void GetProductsByID_ShouldReturnCorrectProduct()
        {
            var productService = new ProductService();
            var result = productService.GetAll() as List<Product>;
            Assert.AreEqual(result[2], productService.GetById(3));
        }

        [TestMethod]
        public void UpdateQuantity_ShouldReturnQuantityLessOne()
        {
            var productService = new ProductService();
            var result = productService.GetAll() as List<Product>;
            productService.Update(1);
            Assert.AreEqual(result[0].Quantity, 9);
        }

    }
}
