import { Container as BaseContainer } from 'unstated-suspense';
declare class Container<State extends object> extends BaseContainer<State> {
    _middlewares: Function[];
    constructor();
    middlewares(): void;
    addMiddleware(middleware: Function): void;
    removeMiddleware(middleware: Function): void;
    setState(updater: State | ((prevState: State) => State), callback?: () => void): Promise<void>;
}
export { Container };
