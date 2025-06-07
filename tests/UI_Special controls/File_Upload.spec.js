//import { test, expect } from require('@playwright/test');
import { test, expect } from '@playwright/test';

test('Right Click', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.waitForLoadState()
        //Loading Image file
        const filepath = './tests/Test_Data/images/Weborder_Login.xlsx'
        //console.log(filepath)
        await page.locator('#file-upload').setInputFiles(filepath)
        await page.locator('#file-submit').click({timeout:5000})
        await page.waitForSelector("//h3[normalize-space()='File Uploaded!']")
        //await page.waitForTimeout(5000)
        await expect(page.locator('#uploaded-files')).toContainText('Weborder_Login')
        //await page.routeFromHAR
    })
