import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';

let registerPage: RegisterPage;
const validUsername = 'ValidUser';
const validPassword = 'validPassword123';

const errorMessageName = 'Name must be at least 6 characters long.';
const errorMessagePassword = 'Password must be at least 6 characters long and include uppercase, lowercase, and a number.';
const userCreatedMessage = 'User created!';

test.describe('Register Page - Name Field', () => {
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto(); // go to URL address
  });

  test.describe('Positive', () => {
    test('should accept valid name and submit form successfully', async () => {
      await registerPage.fillName(validUsername);
      await registerPage.fillPassword(validPassword);
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toBe(userCreatedMessage);
    });

    test('should accept name with exactly 6 characters', async () => {
      await registerPage.fillName('User12');
      await registerPage.fillPassword(validPassword);
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toBe(userCreatedMessage);
    });
  });

  test.describe('Negative', () => {
    test('should reject name shorter than 6 characters', async () => {
      await registerPage.fillName('abc');
      await registerPage.fillPassword(validPassword);
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toContain(errorMessageName);
    });

    test('should reject empty name field', async () => {
      await registerPage.fillName(' ');
      await registerPage.fillPassword(validPassword);
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toContain(errorMessageName);
    });
  });
});

test.describe('Register Page - Password Field', () => {
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test.describe('Positive', () => {
    test('should accept password and create user', async () => {
      await registerPage.fillName(validUsername);
      await registerPage.fillPassword(validPassword);
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toBe(userCreatedMessage);
    });

    test('should accept password with exactly 6 valid characters', async () => {
      await registerPage.fillName(validUsername);
      await registerPage.fillPassword('Aa1bbb');
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toBe(userCreatedMessage);
    });
  });

  test.describe('Negative', () => {
    test('should reject empty password', async () => {
      await registerPage.fillName(validUsername);
      await registerPage.fillPassword(' ');
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toContain(errorMessagePassword);
    });

    test('should reject password shorter than 6 characters', async () => {
      await registerPage.fillName(validUsername);
      await registerPage.fillPassword('Aa1');
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toContain(errorMessagePassword);
    });

    test('should reject password without uppercase letter', async () => {
      await registerPage.fillName(validUsername);
      await registerPage.fillPassword('valid123');
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toContain(errorMessagePassword);
    });

    test('should reject password without lowercase letter', async () => {
      await registerPage.fillName(validUsername);
      await registerPage.fillPassword('VALID123');
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toContain(errorMessagePassword);
    });

    test('should reject password without number', async () => {
      await registerPage.fillName(validUsername);
      await registerPage.fillPassword('ValidPass');
      await registerPage.submitForm();

      const result = await registerPage.getResultText();
      expect(result).toContain(errorMessagePassword);
    });
  });
});