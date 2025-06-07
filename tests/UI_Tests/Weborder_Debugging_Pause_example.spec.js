import { test, expect } from '@playwright/test';

test('test @smoke', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx');
  await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Password:' }).fill('test');
  await page.pause();
  await page.getByRole('button', { name: 'Login' }).click();
  console.log('user loggedin');
  await expect (page.locator('h2')).toContainText('List of All Orders');
  await page.getByRole('link', { name: 'Logout' }).click();
  const login=page.locator('#ct100_Maincontent_login_button');
  console.log(login);
  expect(login).toBeVisible;

});