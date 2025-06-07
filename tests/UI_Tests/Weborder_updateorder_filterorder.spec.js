//import { test, expect } from '@playwright/test';
import { test, expect } from '@playwright/test';

test('Login and Then Create Order and Verify Order @smoke', async ({ page }) => {
  //navigating to URL
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
 //Filling username and password.
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  //Verify that user has logged in
  //await page.url().includes('/Default1.aspx')
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx')
  // Click on Order and Create Order
  await page.getByRole('link', { name: 'Order', exact:true}).click();
  //Verify that user has clicked on Order Link
  await page.url().includes('/Process.aspx')
  await page.getByRole('combobox', { name: 'Product:*' }).selectOption('FamilyAlbum');

  await page.getByLabel('Quantity:*').fill('5');
  const expectedusername = 'Anuja' + Date.now();
 await page.getByLabel('Customer name:*').fill(expectedusername)
  await page.getByLabel('Street:*').fill('BTM');
  page.setDefaultTimeout(50000);
  
  await page.getByLabel('City:*').fill('Bangalore');

  await page.getByLabel('Zip:*').fill('560076');
  await page.getByLabel('Visa').check();
  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
  await page.getByRole('link', { name: 'Process' }).click();

  const neworder = await page.getByText('New Order has been')
  await expect(neworder).toContainText('New order has been successfully added.')
//view all orders
  await page.getByRole('link', { name: 'View all orders' }).click();

  const userRow=page.locator('table tr').filter({has:page.locator('td').filter({hasText:expectedusername})});
  
  //verify user exists
  await expect().toHaveText(expectedusername,{timeout:5000});
  
  //click edit in the same row
  await page.locator('#ctl00_MainContent_orderGrid tr',{has:page.locator('td',{hasText:expectedusername})}).locator('input[alt="Edit"]').click();
//Change city
const cityinput=page.locator("//input[@id='ctl00_MainContent_fmwOrder_TextBox3']");
await cityinput.fill('Delhi');
await page.locator("//a[@id='ctl00_MainContent_fmwOrder_UpdateButton']").click();

//verify updated city
const updateduserrow =page.locator().filter({has:page.locator('td',{hasText:expectedusername})});
await expect(updateduserrow.locator('td',{hasText:'Delhi'})).toHaveText('Delhi',{timeout:5000})
await page.getByRole('link', { name: 'Logout' }).click();
  await page.url().includes("/Login.aspx")
  await expect(page).toHaveURL("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx")
});