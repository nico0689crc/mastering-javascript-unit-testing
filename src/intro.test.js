import { describe, test, it, expect } from "vitest";
import { fizzBuzz, max } from "./intro";

 describe('max', () => {
  it('should return the first argument if it is greater', () => {
    //Pattern to follow when organizing your tests: AAA (Arrange, Act and Assert)

    // Arrange
    // const a = 2;
    // const b = 1;

    // Act: Perform the action we want to test.
    // const result = max(a, b);

    //Assert: Verify if the Act match the expectation
    // expect(result).toBe(2);

    expect(max(2, 1)).toBe(2);
  });

  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });

  it('should return the first arguments are equals', () => {
     expect(max(2, 2)).toBe(2);
  });
 });

 describe('fizzBuzz', () => {
  it('should return "FizzBuzz" if number is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it('should return "Fizz" if argument is only divisible by 3', () => {
    expect(fizzBuzz(9)).toBe('Fizz');
    expect(fizzBuzz(27)).toBe('Fizz');
  });
  
  it('should return "Buzz" if argument is only divisible by 5', () => {
    expect(fizzBuzz(25)).toBe('Buzz');
  });

  it('should return the argument converted to string if it is not divisible by 3 or 5', () => {
    expect(fizzBuzz(8)).toBe('8');
  });
 });