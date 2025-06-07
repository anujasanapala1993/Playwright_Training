//import { test, expect } from '@playwright/test';
import { test, expect } from '@playwright/test';

test('Login and Then Create Order and Verify Order @smoke', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  //Browser.object.action
  await page.getByLabel('Username:').fill('Tester');
  //await page.pause();
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
  //await page.getByLabel('Quantity:*').click();
  //await page.getByText('Quantity:*').click();
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

  await page.getByRole('link', { name: 'View all orders' }).click();



await expect(page.locator(`//td[normalize-space()='${expectedusername}']`)).toHaveText(expectedusername);

// Delete the Order and Verify that Order got deleted
 
    await page.locator("//td[normalize-space()='" + expectedusername + "']//preceding-sibling::td/input").click();
    await page.locator("#ctl00_MainContent_btnDelete").click()
    // Verify that user got deleted
 
  await expect(page.locator('#ctl00_MainContent_orderGrid')).not.toContainText(ExpUserName)});
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.url().includes("/Login.aspx");
 