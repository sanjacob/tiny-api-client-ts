import { jest } from '@jest/globals';

import { APIClient, get, post, put, patch, del } from '../src/index.js';

const exampleRes = ['user_a', 'user_b', 'user_c', 'user_d'];
const exampleObj = {
  title: 'My note',
  desc: 'I love making notes'
};

interface Note {
  title: string;
  desc: string;
}
const exampleUrl = "https://example.org/api/public";

describe('http methods', () => {
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

describe('endpoint features', () => {
  test('not json', () => {
    @APIClient(() => exampleUrl, { fetch: () => ({ json: () => exampleRes }) })
    class MyClient {
      @get(() => '/my-endpoint', { json: false })
      getUsers(params: {} = {}, options: {} = {}, response?: { json: () => string[] }): { json: () => string[] } {
        return response ?? { json: () => [] };
      }
    }

    const client = new MyClient();
    const r = client.getUsers();
    expect(r.json()).toBe(exampleRes);
  });

  test('endpoint extra params', () => {
    const extraParam = 'my extra param';

    @APIClient(() => exampleUrl, { fetch: () => ({ json: () => exampleRes }) })
    class MyClient {
      users: {[key: string]: string[]} = {}

      @get(() => '/my-endpoint')
      getUsers(params: {} = {}, options: {} = {}, response?: string[], key?: string): string[] {
        if (key === undefined) { return [] };
        this.users[key] = response ?? [];
        return response ?? [];
      }
    }

    const client = new MyClient();
    const r = client.getUsers({}, {}, undefined, extraParam);
    expect(r).toBe(exampleRes);
    expect(client.users).toHaveProperty(extraParam, exampleRes);
  });

  test('route parameters', () => {
    const f = jest.fn((route, options) => ({ json: () => exampleObj }));

    @APIClient(() => exampleUrl, { fetch: f })
    class MyClient {
      @get(({userId, noteId}) => `/users/${userId}/notes/${noteId}`)
      getNotes(params: {userId: number, noteId: number}, options: {} = {}, response?: Note): Note {
        return response ?? { title: '', desc: '' };
      }
    }

    const client = new MyClient();
    const r = client.getNotes({userId: 1234, noteId: 9123});

    expect(f.mock.calls).toHaveLength(1);
    expect(f.mock.calls[0]).toHaveLength(2);
    expect(f.mock.calls[0][0]).toBe('https://example.org/api/public/users/1234/notes/9123');

    expect(r).toBe(exampleObj);
  });

  test('optional route parameters', () => {
    const f = jest.fn((route, options) => ({ json: () => exampleObj }));

    @APIClient(() => exampleUrl, { fetch: f })
    class MyClient {
      @get(({userId, noteId}) => `/users/${userId}/notes/${noteId}`)
      getNotes(params: {userId: number, noteId?: number}, options: {} = {}, response?: Note): Note {
        return response ?? { title: '', desc: '' };
      }
    }

    const client = new MyClient();
    const r = client.getNotes({userId: 1234});

    expect(f.mock.calls).toHaveLength(1);
    expect(f.mock.calls[0]).toHaveLength(2);
    expect(f.mock.calls[0][0]).toBe('https://example.org/api/public/users/1234/notes/');

    expect(r).toBe(exampleObj);
  });

  test('api versions', () => {
    const f = jest.fn((route, options) => ({ json: () => exampleRes }));

    @APIClient(({v}) => `${exampleUrl}/v${v}`, { fetch: f })
    class MyClient {
      @get(() => '/my-endpoint')
      getUsers(params: {} = {}, options: {} = {}, response?: string[]): string[] {
        return response ?? [];
      }

      @get(() => '/my-endpoint', { version: 2 })
      getUsersTwo(params: {} = {}, options: {} = {}, response?: string[]): string[] {
        return response ?? [];
      }

      @get(() => '/my-endpoint', { version: 3 })
      getUsersThree(params: {} = {}, options: {} = {}, response?: string[]): string[] {
        return response ?? [];
      }
    }

    const client = new MyClient();
    client.getUsers();
    expect(f.mock.calls[0][0]).toBe('https://example.org/api/public/v1/my-endpoint');
    client.getUsersTwo();
    expect(f.mock.calls[1][0]).toBe('https://example.org/api/public/v2/my-endpoint');
    client.getUsersThree();
    expect(f.mock.calls[2][0]).toBe('https://example.org/api/public/v3/my-endpoint');
  });
});
