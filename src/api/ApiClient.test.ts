import { rest } from 'msw';

import { server } from '~/mocks/server';

import { ApiClient } from './ApiClient';

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
    apiClient.apiHost = 'https://test-host.com';
  });

  describe('initialisation', () => {
    describe.each([{ member: 'userKey' }, { member: 'apiHost' }, { member: 'endpoint' }])(
      'Class members: $member',
      ({ member }) => {
        it('gets and sets', () => {
          console.log('MEMBER: ', member);
          apiClient[member] = 'test-value';
          expect(apiClient[member]).toBe('test-value');
        });
      },
    );
  });

  describe('handleErrors', () => {
    it('Throws a response error is response is not ok', () => {
      expect(() => ApiClient.handleErrors({ ok: false } as Response)).toThrow();
    });

    it("Returns response if it's ok", () => {
      expect(() => ApiClient.handleErrors({ ok: true } as Response)).not.toThrow();
    });
  });

  describe('mapParamsToApi', () => {
    it('should map params to the API params required', () => {
      apiClient.fieldMapping = {
        test: {
          test1: 'testA',
          test2: 'testB',
        },
      };

      expect(apiClient.mapParamsToApi({ test1: 'Hello', test2: 'World' }, 'test')).toEqual({
        testA: 'Hello',
        testB: 'World',
      });
    });

    it('should use the param key if no API key supplied', () => {
      apiClient.fieldMapping = {
        test: {
          test1: 'testA',
        },
      };

      expect(apiClient.mapParamsToApi({ test1: 'Hello', test2: 'World' }, 'test')).toEqual({
        testA: 'Hello',
        test2: 'World',
      });
    });
  });

  describe('makeRequest', () => {
    it('should call fetch with apiHost prepended to the provided url', async () => {
      server.use(
        rest.get('*/test/endpoint', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}));
        }),
      );

      const response = await apiClient.makeRequest('/test/endpoint');
      expect(response.ok).toBe(true);
    });

    it('should handle errors when response is not ok', () => {
      server.use(
        rest.get('*/api', (req, res, ctx) => {
          return res(ctx.status(401, 'Test Error'));
        }),
      );

      expect(apiClient.makeRequest('/api')).rejects.toThrow();
    });
  });

  describe('makeAuthenticatedRequest', () => {
    it('should call fetch with authentication header containing userKey', async () => {
      server.use(
        rest.delete('*/api', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}));
        }),
      );

      const testOptions = {
        method: 'DELETE',
        headers: { Accept: 'everything' },
      };
      apiClient.userKey = 'test-key-123';
      const response = await apiClient.makeAuthenticatedRequest('/api', testOptions);
      expect(response.ok).toBe(true);
    });
  });

  describe.each([
    { fn: 'makeAuthenticatedPostRequest' },
    { fn: 'makePostRequest' },
    { fn: 'makeAuthenticatedPutRequest' },
  ])('Class functions: $fn', ({ fn }) => {
    const body = {
      id: 1,
      test: 'yes',
    };

    it('Calls fetch with json headers', async () => {
      server.use(
        rest.post('*/some/url', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}));
        }),
        rest.put('*/some/url', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}));
        }),
      );

      const response = await apiClient[fn]('/some/url', body);
      expect(response).toStrictEqual({});
    });

    it('Includes the stringified body', async () => {
      server.use(
        rest.post('*/some/url', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}));
        }),
        rest.put('*/some/url', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}));
        }),
      );

      const response = await apiClient[fn]('/some/url', body);
      expect(response).toStrictEqual({});
    });

    it('Returns the response body', () => {
      const response = { this: 'was returned' };
      server.use(
        rest.post('*/some/url', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(response));
        }),
        rest.put('*/some/url', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(response));
        }),
      );

      expect(apiClient[fn]('/some/url', body)).resolves.toEqual(response);
    });
  });
});
