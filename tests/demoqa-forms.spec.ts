import { test, expect } from '@playwright/test';
import { FormsPage } from '../pages/FormsPage';
import * as path from 'path';

// Use process.cwd() for compatibility with CommonJS and ES modules
const picturePath = path.join(process.cwd(), 'tests', 'sample-upload.txt');

// Test to fill and submit the DemoQA Practice Form using POM

test('Submit Practice Form at DemoQA', async ({ page }) => {
  const formsPage = new FormsPage(page);
  await formsPage.goto();

  // Prepare test data
  const testData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    gender: 'Female',
    mobile: '1234567890',
    dob: '01 Jan 2000',
    subjects: ['Maths', 'English'],
    hobbies: ['Reading', 'Music'],
    picturePath,
    address: '123 Main St, Test City',
    state: 'NCR',
    city: 'Delhi',
  };

  // Fill the form
  await formsPage.fillForm(testData);
  await formsPage.submit();

  // Verify the modal result
  await expect(formsPage.modal).toBeVisible();
  const result = await formsPage.getSubmissionResult();
  expect(result['Student Name']).toBe(`${testData.firstName} ${testData.lastName}`);
  expect(result['Student Email']).toBe(testData.email);
  expect(result['Gender']).toBe(testData.gender);
  expect(result['Mobile']).toBe(testData.mobile);
  expect(result['Date of Birth']).toContain(testData.dob.split(' ')[2]); // checks year
  expect(result['Subjects']).toContain(testData.subjects[0]);
  expect(result['Hobbies']).toContain(testData.hobbies[0]);
  expect(result['Picture']).toContain('sample-upload.txt');
  expect(result['Address']).toContain(testData.address.split(',')[0]);
  expect(result['State and City']).toContain(`${testData.state} ${testData.city}`);
});
