import Controller, { VERB } from '../core/Controller';
import { CIRUrlModel } from '../models';
import { CIR_URLS_URL } from "../constants/urls";
import Error from "../core/Error";

class CIRUrlController extends Controller {
    get routes() {
        return [
            {
                route: CIR_URLS_URL,
                verb: VERB.POST,
                handler: this.createUpdateImportRequestsURLs
            },
            {
                route: `${CIR_URLS_URL}/:id`,
                verb: VERB.GET,
                handler: this.getImportRequestURLs
            },
            {
                route: `${CIR_URLS_URL}/:id`,
                verb: VERB.DELETE,
                handler: this.deleteImportRequestURLs
            }
        ];
    }

    async createUpdateImportRequestsURLs(req, res, next) {
        const {
            importRequestId,
            urls
        } = req.body;

        try {
            await CIRUrlModel.deleteMany({ importRequestId }).exec();
        } catch (e) {
            console.log(e);
            return next(e);
        }

        try {
            for (let i = 0; i < urls.length; i++) {
                const cirUrl = new CIRUrlModel({
                    importRequestId,
                    url: urls[i]
                });
                await cirUrl.save();
            };
        } catch (e) {
            console.log(e);
            return next(e);
        }

        return res.json({ status: "succecc" });
    }

    async getImportRequestURLs(req, res, next) {
        const { id } = req.params;
        try {
            const urls = await CIRUrlModel.find({ importRequestId: id }).exec();
            return res.json({
                items: urls.docs === null ? [] : urls.docs
            });
        } catch (e) {
            console.log(e);
            return next(e);
        }
    }

    async deleteImportRequestURLs(req, res, next) {
        const { id } = req.params;
        try {
            await CIRUrlModel.deleteMany({ importRequestId: id }).exec();
            return res.json({ status: 'success' });
        } catch (e) {
            console.log(e);
            return next(e);
        }
    }
}

export default new CIRUrlController();
