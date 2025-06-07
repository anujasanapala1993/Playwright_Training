const fs = require('fs');
const { test, expect } = require('@playwright/test');

// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/Test_Data/WebOrderCreateOrderScenarios.json')
const users = JSON.parse(objects);

for (const record of users) {
test(`WebOrder Create Order Functionality: ${record.test_case}`, async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill(record.name);
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill(record.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await page.getByRole('textbox', { name: 'Quantity:*' }).click();
  await page.getByRole('textbox', { name: 'Quantity:*' }).fill(record.Quantity);
  await page.getByRole('button', { name: 'Calculate' }).click();
  await page.getByRole('textbox', { name: 'Customer name:*' }).click();
  await page.getByRole('textbox', { name: 'Customer name:*' }).fill(record.Customer_Name);
  await page.getByRole('textbox', { name: 'Street:*' }).click();
  await page.getByRole('textbox', { name: 'Street:*' }).fill(record.street);
  await page.getByRole('textbox', { name: 'City:*' }).click();
  await page.getByRole('textbox', { name: 'City:*' }).fill(record.city);
  await page.getByRole('textbox', { name: 'State:' }).click();
  await page.getByRole('textbox', { name: 'State:' }).fill(record.State);
  await page.getByRole('textbox', { name: 'Zip:*' }).click();
  await page.getByRole('textbox', { name: 'Zip:*' }).fill(record.Zip);
  await page.getByRole('radio', { name: 'Visa' }).check();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).click();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).fill(record.cardnumber);
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).click();
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).fill(record.expdate);
  await page.getByRole('link', { name: 'Process' }).click();
  
  if (record.ExpectedResult1 === 'New order has been successfully added.') {
      await expect(page.getByText(record.ExpectedResult1)).toBeVisible();
    } else if (record.ExpectedResult2 === 'Field \'Customer name\' cannot be empty.') {
      await expect(page.getByText(record.ExpectedResult2)).toBeVisible();
    } else if (record.ExpectedResult3 === 'Field \'Street\' cannot be empty.') {
      await expect(page.getByText(record.ExpectedResult3)).toBeVisible();
    } else if (record.ExpectedResult4 === 'Field \'City\' cannot be empty.') {
      await expect(page.getByText(record.ExpectedResult4)).toBeVisible();
    } else if (record.ExpectedResult5 === 'Field \'State\' cannot be empty.') {
      await expect(page.getByText(record.ExpectedResult5)).toBeVisible();
    } else if (record.ExpectedResult6 === 'Field \'Zip\' cannot be empty.') {
      await expect(page.getByText(record.ExpectedResult6)).toBeVisible();
    } else {
      await expect(page.locator("//input[@type='reset']")).toBeVisible();
    }
  });
};
