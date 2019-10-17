import { invokeMap } from 'lodash';
import DefaultController from './DefaultController';

const controllers = {
    DefaultController
};

export function initControllers(router) {
    invokeMap(controllers, 'initRoutes', router);
}
