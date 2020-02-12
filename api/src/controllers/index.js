import { invokeMap } from 'lodash';
import DefaultController from './DefaultController';
import ImportRequestsController from './ImportRequestsController';
import AuthController from './AuthController';
import OffersController from './OffersController';
import ImportController from "./ExportController";
import HeadingController from "./HeadingController";

const controllers = {
    DefaultController,
    ImportRequestsController,
    AuthController,
    OffersController,
    ImportController,
    HeadingController
};

export function initControllers(router) {
    invokeMap(controllers, 'initRoutes', router);
}
