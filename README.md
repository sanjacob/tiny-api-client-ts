# Tiny API Client for TypeScript 🐝

[![License: GPL  v2][license-shield]][gnu]

### Warning:
> This package is in early development, and
> is lacking features you would normally
> expect. Please don't use in production.
> On the other hand, contributions are more
> than welcome.


The short and sweet way to write API consumers

```typescript
import { APIClient, get, post, del } from 'tiny-api-client';

@APIClient('https://example.org/api/public/')
class MyAPIClient:
  @get(({userId}) => `/users/${userId}`)
  findUser(...args: any[]):
    return args[0];

  @post(() => '/notes')
  createNote(...args: any[]):
    return args[0];

  @del(({noteId, fileId}) => `/notes/${noteId}/files/${fileId}`)
  deleteNoteFile(...args: any[]):
    return args[0];

>>> const client = new MyClient()
>>> client.findUser({userId: 'PeterParker'})
{'name': 'Peter', 'surname': 'Parker', ...}
>>> client.createNote(data={'title': 'New Note', 'content': 'Hello World!'})
{'id': ...}
```


## About

This package is my TypeScript adaptation of the tiny-api-client library I
originally wrote for Python. Its purpose is to provide an easy way for API
consumers, such as Vue or React frontends, to call operations on the API.
Note that there are significant differences between the Python and TS
interfaces. Furthermore, 90% of the features that exist in the Python
library do not exist in this one yet.

Due to a limitation in TypeScript decorators, endpoints must have
the annoying signature `...args: any[]`. I will update this if
that is no longer the case.



## Installation

```bash
bun add tiny-api-client
```



## Documentation

The documentation is still not available.


## License

[![License: LGPL  v2.1][license-shield]][gnu]

This software is distributed under the
[Lesser General Public License v2.1][license],
more information available at the [Free Software Foundation][gnu].



<!-- LICENSE -->

[license]: LICENSE "Lesser General Public License v2.1"
[gnu]: https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html "Free Software Foundation"
[license-shield]: https://img.shields.io/github/license/sanjacob/tiny-api-client-ts
