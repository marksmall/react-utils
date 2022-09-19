// import { describe, expect, it } from 'vitest';

import { ResponseError } from './ResponseError';

describe('ResponseError', () => {
  describe('Initialisation', () => {
    it('should have a message', () => {
      const error = new ResponseError({
        statusText: 'Test Error Message',
      } as Response);

      expect(error.message).toBe('Test Error Message');
    });

    it('should have a status', () => {
      const error = new ResponseError({
        status: 405,
      } as Response);

      expect(error.status).not.toBe(200);
      expect(error.status).toBe(405);
    });
  });

  describe('getErrors', () => {
    it('should return an empty array if no errors', () => {
      const errors = {};
      const response = { json: () => new Promise(resolve => resolve(errors)) };
      const error = new ResponseError(response as Response);

      expect(error.getErrors()).resolves.toBeUndefined();
    });

    it('should return a list of error strings, if it contains an error object', async () => {
      const errors = {
        errors: {
          field1: ['field1/error1', 'field1/error2'],
          field2: ['field2/error1', 'field2/error2'],
        },
      };
      const expected = [
        'field1/error1',
        'field1/error2',
        'field2/error1',
        'field2/error2',
      ];

      const response = { json: () => new Promise(resolve => resolve(errors)) };
      const error = new ResponseError(response as Response);

      expect(await error.getErrors()).toStrictEqual(expected);
    });

    it('should return a list of error strings, if it contains a non_field_error object', async () => {
      const non_field_errors = ['non-field-error1', 'non-field-error2'];
      const errors = { non_field_errors };

      const response = {
        json: () => new Promise(resolve => resolve(errors)),
      };
      const error = new ResponseError(response as Response);

      expect(await error.getErrors()).toStrictEqual(non_field_errors);
    });

    it('should return a list of error strings, if it contains an error object and non_field_error object', async () => {
      const non_field_errors = ['non-field-error1', 'non-field-error2'];
      const errors = {
        errors: {
          field1: ['field1/error1', 'field1/error2'],
          field2: ['field2/error1', 'field2/error2'],
        },
        non_field_errors,
      };
      const expected = [
        'non-field-error1',
        'non-field-error2',
        'field1/error1',
        'field1/error2',
        'field2/error1',
        'field2/error2',
      ];

      const response = { json: () => new Promise(resolve => resolve(errors)) };
      const error = new ResponseError(response as Response);

      expect(await error.getErrors()).toStrictEqual(expected);
    });
  });
});
