
/* IMPORT */

import {Container as BaseContainer} from 'unstated-suspense';

/* SUSPENSE MIDDLEWARE */

class Container<State extends object> extends BaseContainer<State> {

  private _running = false;
  private _middlewares: Function[] = [];
  private _middlewaresSuspendNr = 0;
  private _middlewaresSuspendedState?: State;
  private _middlewaresSuspended = false;

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

  suspendMiddlewares (): void {
    this._middlewaresSuspendNr++;
  }

  unsuspendMiddlewares (): void {
    if ( !this._middlewaresSuspendNr ) return;
    this._middlewaresSuspendNr--;
    if ( !this._middlewaresSuspendNr && this._middlewaresSuspended && this._middlewaresSuspendedState ) this._middlewaresRun ( this._middlewaresSuspendedState );
    this._middlewaresSuspendedState = undefined;
  }

  async setState ( updater: ( ( prevState: Readonly<State> ) => Partial<State> | State | null) | Partial<State> | State | null, callback?: Function ): Promise<void> {

    this.suspend ();

    let prevState = this.state;

    await super.setState ( updater, callback );

    await this._middlewaresRun ( prevState );

    this.unsuspend ();

  }

  private async _middlewaresRun ( prevState: State ) {

    this._middlewaresSuspended = !!this._middlewaresSuspendNr;

    if ( this._middlewaresSuspended ) {

      this._middlewaresSuspendedState = this._middlewaresSuspendedState || prevState;

      return;

    }

    if ( !this._middlewares.length ) return;

    const isRunConcurrent = this._running;

    if ( isRunConcurrent ) return;

    this._running = true;

    this.suspend ();

    for ( let i = 0, l = this._middlewares.length; i < l; i++ ) {

      const middleware = this._middlewares[i];

      this.state = await middleware.call ( this, prevState ) || this.state;

    }

    this._running = false;

    this.unsuspend ();

  }

}

/* EXPORT */

export {Container};
