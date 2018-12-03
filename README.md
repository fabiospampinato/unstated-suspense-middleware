# Unstated Suspense Middleware

Add middlewares support to `unstated-suspense`.

## Install

```sh
npm install --save unstated-suspense-middleware
```

## Usage

The following is an overly semplicistic example of how middlewares are added to unstated, but it illustrates the new APIs available and how to use them.

```ts
import * as React from 'react';
import {Container} from 'unstated-suspense-middleware';

class AppContainer extends Container {
  state = {
    value: 'No value...'
  };
  middlewares () { // This function is called by the constructor, it's just a convenience method where you can define your middlewares
    this.addMiddleware ( this.middlewareValueChanged ); // Add a new middleware via the `addMiddleware` method
  }
  middlewareValueChanged ( prevState ) { // Middlewares are called with the previous state
    if ( prevState.value !== this.state.value ) {
      this.removeMiddleware ( this.middlewareValueChanged ); // Remove a middleware via the `removeMiddleware` method
      return state = { value: 'middleware!' }; // A middleware can either mutate the state (ouch!) or return a new one
    }
  }
  updateValueFoo () {
    this.setState ({ value: 'foo' });
  }
  updateValueBar () {
    this.setState ({ value: 'bar' });
  }
}
```

**Note**: Middlewares are **not** re-executed when any of them update the state.

**Note**: Middlewares are executed in the order that they are added, make sure you're adding them in the right order.

## Related

- **[unstated-with-containers](https://github.com/fabiospampinato/unstated-with-containers)**: Higher-Order Component for subscribing to containers.
- **[unstated-connect2](https://github.com/fabiospampinato/unstated-connect2)**: Connect containers to components, without sacrificing performance.
- **[unstated-hmr](https://github.com/fabiospampinato/unstated-hmr)**: Preserve containers' states across Hot-Module-Replacements.
- **[unstated-compose](https://github.com/fabiospampinato/unstated-compose)**: Compose multiple containers into one.
- **[unstated-compose-suspense](https://github.com/fabiospampinato/unstated-compose-suspense)**: Add suspend/unsuspend support to `unstated-compose`.
- **[unstated-compose-suspense-middleware](https://github.com/fabiospampinato/unstated-compose-suspense-middleware)**: Add middlewares support to `unstated-compose-suspense`.
- **[unstated-suspense](https://github.com/fabiospampinato/unstated-suspense)**: Suspend/unsuspend updates propagation from your containers.

## License

MIT © Fabio Spampinato
