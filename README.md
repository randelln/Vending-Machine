# Vending Machine WebApp
React SPA that consumes an ASP.net Core Web API Service

# Direction of use
- React project will require you to run an npm install, inside the root directory, and then you can run npm start to open up the WebApp
- Web API Service, will require Visual Studio(2019 was used to create it). Wait for all necessary NuGet Packages to install, and then click play through IIS Express

# Screenshots
- When the WebApp opens, and the Service is up and running, you will see this home page.

![alt text](screenshots/AppOpen.png "Home Page")

- You will need to click on insert coins, any of your choice, and you will see the balance available for use of buying products go up. 

![alt text](screenshots/AppUseCoins.png "Use Coins")

- Now select on Buy, at whichever product you choose. The system will tell you if your purchase was successful, and return your change. 

![alt text](screenshots/AppBuy.png "Use Coins")

- You will notice that after a successful purchase, the product quantity of the item bought, decreases. 

![alt text](screenshots/AppAfterBuy.png "Use Coins")
