const fs = require('fs');
const { test, expect } = require('@playwright/test');
 
// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/Test_Data/orange test data.json')
const users = JSON.parse(objects);
 
for (const record of users) {
  test(`Orange Login Functionality: ${record.test_case}`, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(record.uname);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(record.password);
    await page.getByRole('button', { name: 'Login' }).click();

    if (record.exp_res === 'Dashboard') {
      // Successful login
      //await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      await page.setDefaultTimeout(50000);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
     
    } else if (record.exp_res === 'Invalid credentials') {
      // invalid login

      await expect(page.getByText('Invalid credentials')).toBeVisible();
      
    } else {
      //invalid login

      await expect(page.getByText('Required')).toBeVisible();
    }
  });

}