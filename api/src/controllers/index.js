import { invokeMap } from 'lodash';
import DefaultController from './DefaultController';
import ImportRequestsController from './ImportRequestsController';
import AuthController from './AuthController';
import OffersController from './OffersController';
import ImportController from "./ExportController";

const controllers = {
    DefaultController,
    ImportRequestsController,
    AuthController,
    OffersController,
    ImportController
};

export function initControllers(router) {
    invokeMap(controllers, 'initRoutes', router);
}
