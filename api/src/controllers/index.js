import { invokeMap } from 'lodash';
import DefaultController from './DefaultController';
import ImportRequestsController from './ImportRequestsController';
import AuthController from './AuthController';
import OffersController from './OffersController';
import ImportController from "./ExportController";
import HeadingController from "./HeadingController";
import CallcenterImportRequestsController from "./CallcenterImportRequestsController";
import CIRUrlController from "./CIRUrlController";

const controllers = {
    DefaultController,
    ImportRequestsController,
    AuthController,
    OffersController,
    ImportController,
    HeadingController,
    CallcenterImportRequestsController,
    CIRUrlController
};

export function initControllers(router) {
    invokeMap(controllers, 'initRoutes', router);
}
