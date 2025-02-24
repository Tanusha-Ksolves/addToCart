const {test,expect} = require('@playwright/test');

test('sumOfCart', async ({browser}) => {
    

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://store.ksolves.com/web/login");

  //To login the website

  const userEmail = page.locator('#login');
  const userPassword = page.locator("#password");
  const signIn = page.locator("//button[text() = 'Sign in']");
 
  await userEmail.fill("tanusha.jain@ksolves.com");
  await userPassword.fill("T@nu6006");
  await signIn.click();

  console.log(await page.title());

  await page.waitForLoadState('networkidle');

  await page.goto("https://store.ksolves.com/shop/cart");


  let totalSum = 0;


  const countCartItems = await page.locator('//div[@id="cart_products"]/div[contains(@class, "o_cart_product")]').count();
  console.log("Number of products in cart:", countCartItems);


  for(let i=0 ; i<countCartItems; i++){
    const productPrices = await page.locator('//div[@id="cart_products"]//div[@name="website_sale_cart_line_price"]//span[@class="oe_currency_value"]').nth(i).textContent();
    console.log("Product Prices:", productPrices);
    let price = Number(productPrices.replace(/,/g, ""));;
    totalSum = totalSum + price;

  }
  console.log(totalSum + " €");

  //.toLocaleString("en-US") → Formats the number with commas as thousand separators.
  // { minimumFractionDigits: 2, maximumFractionDigits: 2 } → Ensures two decimal places.

  let total = totalSum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  await expect(page.locator("//strong[@class='monetary_field text-end p-0']")).toContainText(total + " €");
}
);
