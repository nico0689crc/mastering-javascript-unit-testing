import { vi, it, expect, describe, beforeEach } from 'vitest';

import { getPriceInCurrency, getShippingInfo, renderPage, submitOrder } from './mocking';
import { getShippingQuote } from './libs/shipping.js';
import { getExchangeRate } from './libs/currency.js';
import { trackPageView } from './libs/analytics.js';
import { charge } from './libs/payment.js';

vi.mock('./libs/currency');
vi.mock('./libs/shipping.js');
vi.mock('./libs/analytics');
vi.mock('./libs/payment.js');

describe('test suite', () => {
  it('test case', () => {
    // Create a mock for the following function
    const sendText = vi.fn();
    sendText.mockReturnValue('ok');

    // Call the mock function
    const result = sendText('message');

    // Assert that the mock function is called
    expect(sendText).toHaveBeenCalledWith('message');
    // Assert that the result is 'ok'
    expect(result).toBe('ok');
  });
});

describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, 'AUD');

    expect(price).toBe(15);
  });
});

describe('getShippingInfo', () => {
  it.each([
    { destination: 'AUS', returnValueFromFn: { cost: 10 , estimatedDays: 2 }, result: /\$10 \(2 days\)/i},
    { destination: 'ARG', returnValueFromFn: { cost: 5 , estimatedDays: 20 }, result: /\$5 \(20 days\)/i},
    { destination: 'ITA', returnValueFromFn: null, result: /unavailable/i}
  ])('should return $result for $destination', ({destination, returnValueFromFn, result}) => {
    vi.mocked(getShippingQuote).mockReturnValue(returnValueFromFn);

    const info = getShippingInfo(destination);

    expect(info).toMatch(result);
  });
});

describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it('should call analytics', async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

describe('submitOrder', () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: 'xEkhEQ' };

  it('should pass when "charge" is called with correct values', async () => {
    vi.mocked(charge).mockReturnValue({ status: 'success' });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it('should return success object when passing the correct values', async () => {
    vi.mocked(charge).mockReturnValue({ status: 'success' });

    const result = await submitOrder(order, creditCard);

    expect(result).toMatchObject({ success: true });
  });

  it('should return error object when passing the incorrect values', async () => {
    vi.mocked(charge).mockReturnValue({ status: 'failed' });
    
    const result = await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    expect(result).toMatchObject({ success: false, error: 'payment_error' });
  });
})