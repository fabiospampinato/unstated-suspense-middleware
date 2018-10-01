
/* IMPORT */

import {Container as BaseContainer} from 'unstated-suspense';

/* SUSPENSE MIDDLEWARE */

class Container<State extends object> extends BaseContainer<State> {

  _middlewares: Function[] = [];

  constructor () {

    super ();

    this.middlewares ();

  }

  middlewares () {}

  addMiddleware ( middleware: Function ) {

    this._middlewares.push ( middleware );

  }

  removeMiddleware ( middleware: Function ) {

    this._middlewares = this._middlewares.filter ( m => m !== middleware );

  }

  async setState ( updater: State | ( ( prevState: State ) => State ), callback?: () => void ) {

    this.suspend ();

    let prevState = this.state;

    await super.setState ( updater, callback );

    for ( let i = 0, l = this._middlewares.length; i < l; i++ ) {

      const middleware = this._middlewares[i];

      this.state = await middleware.call ( this, prevState ) || this.state;

    }

    this.unsuspend ();

  }

}

/* EXPORT */

export {Container};
