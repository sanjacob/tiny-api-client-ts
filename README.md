# Tiny API Client for TypeScript 🐝

[![NPM Registry][version-shield]][npm] [![License: GPL  v2][license-shield]][gnu]

> [!WARNING]
> This package is in early development, and is lacking features
> you would normally expect. Please don't use in production.
> On the other hand, contributions are more than welcome.


The short and sweet way to write API consumers

```typescript
import { APIClient, get, post, del } from 'tiny-api-client';

@APIClient(({v}) => `https://example.org/api/public/v${v}`)
class MyAPIClient {
  @get(({userId}) => `/users/${userId}`)
  findUser(params: {userId: string}, options: any = {}, response?: User) {
    return response;
  }

  @post(() => '/notes')
  createNote(params: {}, options: any, response?: Note) {
    return response;
  }

  @del(({noteId, fileId}) => `/notes/${noteId}/files/${fileId}`)
  deleteNoteFile(params: {noteId: string, fileId: string}, options: any, response?: boolean) {
    return response;
  }
}

>> const client = new MyClient()
>> client.findUser({userId: 'PeterParker'})
{'name': 'Peter', 'surname': 'Parker', ...}
>> client.createNote({}, {body: {title: 'New Note', content: 'Hello World!'}})
{'id': ...}
```


## About

This package is my TypeScript adaptation of the tiny-api-client library I
originally wrote for Python. Its purpose is to provide an easy way for API
consumers, such as Vue or React frontends, to call operations on the API.
Note that there are significant differences between the Python and TS
interfaces. Furthermore, half of the features that exist in the Python
library do not exist in this one yet. The features that do exist in this
library have not been tested thoroughly.

### Requirements

If you are using Node.js:

- Node.js >=18.x (requires Fetch API)



## Features

- Endpoints can be declared with one of: `@get`, `@post`, `@put`, `@patch`, `@del`
- Auto-conversion of responses to *JSON*, can be disabled per endpoint
- Easy integration with your custom API models
- Full control over route parameter templates
- Support for API version insertion in url template
- Freedom over parameter types and defaults in each endpoint
- Wraps the native `fetch` api, and options are passed to it



## Installation

```bash
bun add tiny-api-client
```

> Feel free to use npm, yarn, or other instead



## Documentation

The documentation is still not available.


## License

[![License: LGPL  v2.1][license-shield]][gnu]

This software is distributed under the
[Lesser General Public License v2.1][license],
more information available at the [Free Software Foundation][gnu].



<!-- LINKS -->
[npm]: https://www.npmjs.com/package/tiny-api-client

<!-- SHIELDS -->
[version-shield]: https://img.shields.io/npm/v/tiny-api-client?color=blue

<!-- LICENSE -->

[license]: LICENSE "Lesser General Public License v2.1"
[gnu]: https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html "Free Software Foundation"
[license-shield]: https://img.shields.io/github/license/sanjacob/tiny-api-client-ts
