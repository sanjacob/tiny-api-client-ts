import { ClientOptions, EndpointOptions } from './types';

export const clientDefaults: ClientOptions = {
  resultsKey: 'results'
}

export const endpointDefaults: Required<EndpointOptions> = {
  json: true,
  version: 1
}
