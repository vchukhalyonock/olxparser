import { invokeMap } from 'lodash';
import DefaultController from './DefaultController';
import ImportRequestsController from './ImportRequestsController';
import AuthController from './AuthController';

const controllers = {
    DefaultController,
    ImportRequestsController,
    AuthController,
};

export function initControllers(router) {
    invokeMap(controllers, 'initRoutes', router);
}
