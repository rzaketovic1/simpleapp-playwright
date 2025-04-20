import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:54587/api/register';

const validName = 'ValidUsername';
const validPassword='ValidPassword123';

const userCreatedMessage = 'User created!';
const errorMessageName = 'Name must be at least 6 characters long and not empty.';
const errorMessagePassword = 'Password must be at least 6 characters long and include uppercase, lowercase and a number.';

test.describe('Register API - Name Validation', () => {
  test('should return 201 for valid name and password', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: validName,
        password: validPassword
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.message).toBe(userCreatedMessage);
  });

  test('should return 400 for short name', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: 'abc',
        password: validPassword
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain(errorMessageName);
  });

  test('should return 400 for empty name', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: ' ',
        password: validPassword
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain(errorMessageName);
  });
});

test.describe('Register API - Password Validation', () => {
  test('should return 201 for valid password with exactly 6 characters', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: validName,
        password: 'Aa1bbb'
      }
    });
  
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.message).toBe(userCreatedMessage);
  });
  test('should return 400 for empty password', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: validName,
        password: ' '
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain(errorMessagePassword);
  });

  test('should return 400 for password without uppercase letter', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: validName,
        password: 'valid123'
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain(errorMessagePassword);
  });

  test('should return 400 for password without lowercase letter', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: validName,
        password: 'VALID123'
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain(errorMessagePassword);
  });

  test('should return 400 for password without number', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: validName,
        password: 'InvalidPass'
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain(errorMessagePassword);
  });

  test('should return 400 for password shorter than 6 characters', async ({ request }) => {
    const response = await request.post(baseUrl, {
      data: {
        name: validName,
        password: 'Aa1'
      }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain(errorMessagePassword);
  });
});