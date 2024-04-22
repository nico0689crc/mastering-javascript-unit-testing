import { describe, it, expect, beforeEach } from "vitest";
import { Stack, canDrive, getCoupons, isValidUsername, validateUserInput } from "./core";

describe('getCoupons', () => {
  const coupons = getCoupons();

  it('should return an array that is not empty', () => {
    expect(Array.isArray(coupons)).toBeTruthy();
    // expect(Array.isArray(coupons)).toBe(true);

    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with two object', () => {
    expect(coupons.length).toBeGreaterThanOrEqual(2);

    coupons.forEach(coupon => {
      expect(coupon).toBeInstanceOf(Object);
    });
  });

  it('should return an array where each object has the properties "code" as string that is not empty', () => {
    coupons.forEach(coupon => {
      expect(coupon).toHaveProperty('code');
      expect(coupon.code).toBeTruthy();
      expect(coupon.code).toBeTypeOf('string');
    });
  });

  it('should return an array where each object has the properties "discount" as number with values between 0 and 1', () => {
    coupons.forEach(coupon => {
      expect(coupon).toHaveProperty('discount');
      expect(coupon.discount).toBeTypeOf('number');
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
});

describe('validateUserInput', () => {
  const successKeyWord = /successful/i;
  const invalidKeyWord = /invalid/i;

  it('should pass validation when username is a string', () => {
    expect(validateUserInput('Nico', 19)).toMatch(successKeyWord);
  });

  it('should pass validation when username is longer or equal to 3 characteres', () => {
    expect(validateUserInput('Nico', 19)).toMatch(successKeyWord);
  });

  it('should pass validation when age is an number', () => {
    expect(validateUserInput('Nico', 19)).toMatch(successKeyWord);
  });

  it('should pass validation when age is greater or equal than 18', () => {
    expect(validateUserInput('Nico', 19)).toMatch(successKeyWord);
  });

  it('should pass not validation when username is not a string', () => {
    expect(validateUserInput(13, 19)).toMatch(invalidKeyWord);
  });

  it('should pass not validation when username is not longer or equal to 3 characteres', () => {
    expect(validateUserInput('Ni', 19)).toMatch(invalidKeyWord);
  });

  it('should pass not validation when age is an number', () => {
    expect(validateUserInput('Nico', '19')).toMatch(invalidKeyWord);
  });

  it('should pass not validation when age is greater or equal than 18', () => {
    expect(validateUserInput('Nico', 16)).toMatch(invalidKeyWord);
  });
});


describe('isValidUsername', () => {
  it('should return true when username\'s length is longer or equal than 5 and shorter or equal than 15', () => {
    expect(isValidUsername('Nicolassss')).toBe(true);
  });

  it('should return true when username\'s length is longer or equal than 5', () => {
    expect(isValidUsername('12345')).toBe(true);
  });

  it('should return true when username\'s length is shorter or equal than 15', () => {
    expect(isValidUsername('Nicolasssssssss')).toBe(true);
  });

  it('should return false when username\'s length is shorter than 5', () => {
    expect(isValidUsername('Nico')).toBe(false);
  });

  it('should return false when username\'s length is longer than 15', () => {
    expect(isValidUsername('Nicolassssssssss')).toBe(false);
  });
});

 
// Parameterized Tests
describe('canDrive', () => {
  it('should return error for invalid country code', () => {
    expect(canDrive(20, 'FR')).toMatch(/invalid/i);
  });

  it.each([
    { age: 15, country: 'US', result: false },
    { age: 16, country: 'US', result: true },
    { age: 17, country: 'US', result: true },
    { age: 16, country: 'UK', result: false },
    { age: 17, country: 'UK', result: true },
    { age: 18, country: 'UK', result: true }
  ])('should return $result for $age, $country', ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
});

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('push should add an item to the stack', () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });

  it('pop should remove and return the top item from the stack', () => {
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it('pop should throw an error if stack is empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  it('peek should return the top item from the stack without removing it', () => {
    stack.push(1);
    stack.push(2);

    const peekedItem = stack.peek();

    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it('peek should throw an error if stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  it('isEmpty should return true if stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('isEmpty should return false if stack is not empty', () => {
    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it('size should return the number of items in the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });

  it('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);

    stack.clear();

    expect(stack.size()).toBe(0);
  });
});