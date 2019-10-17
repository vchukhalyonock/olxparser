import Controller, { VERB } from '../core/Controller';


class DefaultController extends Controller {

    get routes() {
        return [
            {
                route: '/',
                verb: VERB.GET,
                handler: this.defaultRoute
            }
        ]
    }

    defaultRoute(req, res, next) {
        return res.json({message: "Default Route"});
    }
}

export default new DefaultController();