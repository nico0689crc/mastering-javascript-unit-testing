import { describe, it, expect } from "vitest";
import { getCoupons, isValidUsername, validateUserInput } from "./core";

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