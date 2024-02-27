import { ClientOptions, EndpointOptions } from './types';

export const clientDefaults: Required<ClientOptions> = {
  resultsKey: 'results',
  fetch: fetch
}

export const endpointDefaults: Required<EndpointOptions> = {
  json: true,
  version: 1
}
