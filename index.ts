/**
 * Tiny API Client for TypeScript
 * for short and sweet API consumers
 *
 * @example
 * ```
 * @APIClient('https://api.example.com')
 * class MyClient {
 *   @get(({userId, photoId}) => `/users/${userId}/photos/${photoId}`)
 *   findPhoto(...args: any[]) {
 *     const response = args[0];
 *     // do something with the response
 *   }
 * }
 *
 * const client = new MyClient();
 * client.findPhoto({userName: 324, photoId: 99});
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

/**
 * Declare an API endpoint method
 * @param method - The HTTP method to use in requests
 */
function APIMethod(method: string) {
  return function (route: (params: {[key: string]: string}) => string) {
    return function (target: any, _context: ClassMethodDecoratorContext) {
      return function (this: any, params: {[key: string]: string} , ...args: any[]) {
        const endpoint = this.api_url + route(params);
        const response = fetch(endpoint);
        const result = target.call(this, response, ...args);
        return result;
      }
    }
  }
}

/**
 * Declare an API client class
 * @param url - The base URL of the API server
 */
export function APIClient(url: string) {
  return function (target: any, _context: ClassDecoratorContext) {
    target.prototype.api_url = url;
  }
}

export const get = APIMethod('GET');
export const post = APIMethod('POST');
export const put = APIMethod('PUT');
export const patch = APIMethod('PATCH');
export const del = APIMethod('DELETE');
