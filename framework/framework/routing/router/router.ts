module plat.routing {
    export class Router {
        configure() {

        }
    }

    export function IRouter() {
        return new Router();
    }

    plat.register.injectable(__Router, IRouter);
}
