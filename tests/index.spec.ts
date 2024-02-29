import { jest } from '@jest/globals';

import { APIClient, get, post, put, patch, del } from '../src/index.js';

const exampleRes = { title: 'Three in a Cell', artist: 'The Peddlers', year: 1968 }
const exampleUrl = "https://example.org/api/public"

describe('basic', () => {
  test('get request', () => {
    const f = jest.fn((route, options) => ({ json: () => exampleRes }));

    @APIClient(() => exampleUrl, { fetch: f })
    class MyClient {
      @get(() => '/my-endpoint')
      getUsers(params: {} = {}, options: {} = {}, response?: string[]): string[] {
        return response ?? [];
      }
    }

    const client = new MyClient();
    const r = client.getUsers();

    expect(f.mock.calls).toHaveLength(1);
    expect(f.mock.calls[0]).toHaveLength(2);
    expect(f.mock.calls[0][0]).toBe('https://example.org/api/public/my-endpoint');
    expect(f.mock.calls[0][1]).toHaveProperty('method', 'GET');

    expect(r).toBe(exampleRes);
  });

  test('post request', () => {
    const f = jest.fn((route, options) => ({ json: () => exampleRes }));

    @APIClient(() => exampleUrl, { fetch: f })
    class MyClient {
      @post(() => '/my-endpoint')
      postUsers(params: {} = {}, options: {} = {}, response?: string[]): string[] {
        return response ?? [];
      }
    }

    const client = new MyClient();
    const r = client.postUsers();

    expect(f.mock.calls).toHaveLength(1);
    expect(f.mock.calls[0]).toHaveLength(2);
    expect(f.mock.calls[0][0]).toBe('https://example.org/api/public/my-endpoint');
    expect(f.mock.calls[0][1]).toHaveProperty('method', 'POST');

    expect(r).toBe(exampleRes);
  });

  test('put request', () => {
    const f = jest.fn((route, options) => ({ json: () => exampleRes }));

    @APIClient(() => exampleUrl, { fetch: f })
    class MyClient {
      @put(() => '/my-endpoint')
      putUsers(params: {} = {}, options: {} = {}, response?: string[]): string[] {
        return response ?? [];
      }
    }

    const client = new MyClient();
    const r = client.putUsers();

    expect(f.mock.calls).toHaveLength(1);
    expect(f.mock.calls[0]).toHaveLength(2);
    expect(f.mock.calls[0][0]).toBe('https://example.org/api/public/my-endpoint');
    expect(f.mock.calls[0][1]).toHaveProperty('method', 'PUT');

    expect(r).toBe(exampleRes);
  });

  test('patch request', () => {
    const f = jest.fn((route, options) => ({ json: () => exampleRes }));

    @APIClient(() => exampleUrl, { fetch: f })
    class MyClient {
      @patch(() => '/my-endpoint')
      patchUsers(params: {} = {}, options: {} = {}, response?: string[]): string[] {
        return response ?? [];
      }
    }

    const client = new MyClient();
    const r = client.patchUsers();

    expect(f.mock.calls).toHaveLength(1);
    expect(f.mock.calls[0]).toHaveLength(2);
    expect(f.mock.calls[0][0]).toBe('https://example.org/api/public/my-endpoint');
    expect(f.mock.calls[0][1]).toHaveProperty('method', 'PATCH');

    expect(r).toBe(exampleRes);
  });

  test('del request', () => {
    const f = jest.fn((route, options) => ({ json: () => exampleRes }));

    @APIClient(() => exampleUrl, { fetch: f })
    class MyClient {
      @del(() => '/my-endpoint')
      deleteUsers(params: {} = {}, options: {} = {}, response?: string[]): string[] {
        return response ?? [];
      }
    }

    const client = new MyClient();
    const r = client.deleteUsers();

    expect(f.mock.calls).toHaveLength(1);
    expect(f.mock.calls[0]).toHaveLength(2);
    expect(f.mock.calls[0][0]).toBe('https://example.org/api/public/my-endpoint');
    expect(f.mock.calls[0][1]).toHaveProperty('method', 'DELETE');

    expect(r).toBe(exampleRes);
  });
});




//const mockResponse = jest.fn(() => expected);
//const f = jest.fn((route, options) => ({ json: mockResponse }));
