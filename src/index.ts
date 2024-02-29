/**
 * Tiny API Client for TypeScript
 * for short and sweet API consumers
 *
 * @example
 * ```
 * import { get, APIClient } from 'tiny-api-client';
 *
 * @APIClient(({v}) => `https://api.example.com/v${v}`)
 * class MyClient {
 *   @get(({userId, photoId}) => `/users/${userId}/photos/${photoId}`, { version: 2 })
 *   findPhoto(params: {userId: string, photoId?: string},
 *             options: any, response?: {photoUrl: string}) {
 *     // do something with the response
 *   }
 * }
 *
 * const client = new MyClient();
 * client.findPhoto({userName: 324, photoId: 99}, {body: ..., headers: ...});
 * ```
 *
 * Copyright (C) 2024, Jacob Sánchez Pérez
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */


/** Interfaces */

export interface ClientOptions {
  resultsKey?: string;
  fetch?: any;
};

export interface EndpointOptions {
  version?: number;
  json?: boolean;
};

interface APIClientInstance {
  apiUrl: ({v}: {v: number}) => string;
  apiOptions: ClientOptions
}

/** Defaults */

export const clientDefaults: Required<ClientOptions> = {
  resultsKey: 'results',
  fetch: fetch
}

export const endpointDefaults: Required<EndpointOptions> = {
  json: true,
  version: 1
}

/** Fetch */

const handleResponse = function<Response extends { json: () => any }>(
  response: Response, json: boolean
): any {

  if (json) {
    const jsonResponse = response.json();

    /*if (resultsKey in jsonResponse) {
      return jsonResponse[resultsKey];
    }*/

    return jsonResponse;
  }

  return response;
}

const makeRequest = function(
  apiFetch: any, endpoint: string,
  options: Required<EndpointOptions>, fetchOptions: any
) {
  const response = apiFetch(endpoint, fetchOptions);
  return handleResponse(response, options.json);
}


/**
 * Declare an API endpoint method
 * @param method - The HTTP method to use in requests
 */
function APIMethod(method: string) {
  return function (
    route: (params: {[key: string]: string}) => string,
    options: EndpointOptions = {}) {

    const merged: Required<EndpointOptions> = {...endpointDefaults, ...options};

    return function<This, PArgs extends {[key: string]: string}, FetchOptions, Response, Args extends any[], Return>(
        target: (
          this: This, pargs: PArgs, fetchOptions: FetchOptions,
          response?: Response, ...args: Args
        ) => Return,
        context: ClassMethodDecoratorContext<This, (
          this: This, pargs: PArgs, fetchOptions: FetchOptions,
          response?: Response, ...args: Args
        ) => Return>
      ) {
      return function (
        this: This, params: PArgs, fetchOptions: FetchOptions,
        response?: Response, ...args: Args
      ): Return {
        const client = this as APIClientInstance;
        const endpoint = client.apiUrl({v: merged.version}) + route(params);
        const fetch = client.apiOptions.fetch;
        const r = makeRequest(
          fetch, endpoint, merged, { method, ...fetchOptions }
        ) as Response;
        return target.call(this, params, fetchOptions, r, ...args);
      }
    }
  }
}

/**
 * Declare an API client class
 * @param url - The base URL of the API server
 */
export function APIClient(
  url: (params: {v: number}) => string,
  options: ClientOptions = {}) {

  return function (target: any, _context: ClassDecoratorContext) {
    target.prototype.apiUrl = url;
    target.prototype.apiOptions = {...clientDefaults, ...options};
  }
}

export const get = APIMethod('GET');
export const post = APIMethod('POST');
export const put = APIMethod('PUT');
export const patch = APIMethod('PATCH');
export const del = APIMethod('DELETE');
