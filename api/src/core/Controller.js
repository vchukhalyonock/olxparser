import authMiddleware from '../middlewares/authMiddleware';

export const VERB = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};


const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve()
            .then(() => fn(req, res, next))
            .catch(next);
    };

class Controller {

    initRoutes(router) {
        this.routes.forEach(config => {
           const verb = config.verb || VERB.GET;
           const args = [config.route];

           if(!config.public) {
               args.push(authMiddleware);
           }

           router[verb].apply(router, [...args, asyncMiddleware(config.handler)]);
        });
    }
}


export default Controller;