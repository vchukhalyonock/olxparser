import { invokeMap } from 'lodash';
import DefaultController from './DefaultController';
import ImportRequestsController from "./ImportRequestsController";

const controllers = {
    DefaultController,
    ImportRequestsController,
};

export function initControllers(router) {
    invokeMap(controllers, 'initRoutes', router);
}
