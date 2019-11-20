import { invokeMap } from 'lodash';
import DefaultController from './DefaultController';
import ImportRequestsController from './ImportRequestsController';
import AuthController from './AuthController';
import OffersController from './OffersController';

const controllers = {
    DefaultController,
    ImportRequestsController,
    AuthController,
    OffersController
};

export function initControllers(router) {
    invokeMap(controllers, 'initRoutes', router);
}
