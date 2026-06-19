import { successResponse, errorResponse, notFoundResponse } from './util.js';

describe('successResponse', () => {
  it('should return success=true with data', () => {
    const result = successResponse({ id: 1, name: 'test' });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ id: 1, name: 'test' });
    expect(result.timestamp).toBeDefined();
    expect(result.error).toBeUndefined();
  });
});

describe('errorResponse', () => {
  it('should return success=false with error message', () => {
    const result = errorResponse('Something went wrong');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Something went wrong');
    expect(result.timestamp).toBeDefined();
    expect(result.data).toBeUndefined();
  });
});

describe('notFoundResponse', () => {
  it('should return a not found error for the given resource', () => {
    const result = notFoundResponse('Item');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Item not found');
  });
});
