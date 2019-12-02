import { QStatusModel } from '../models';
import { QM_STATUSES } from '../models/QStatusModel';

class QMService {
    static async setActive() {
        await QMService.setStatus(QM_STATUSES.ACTIVE);
    }

    static async setWait() {
        await QMService.setStatus(QM_STATUSES.WAIT);
    }

    static async setStatus(status) {
        const newStatus = {
            status,
            ts: new Date()
        };
        const oldStatus = await QMService.getStatus();
        if (status) {
            await QStatusModel.replaceOne({_id: oldStatus._id}, newStatus).exec();
        } else {
            const statusModel = new QStatusModel(newStatus);
            await statusModel.save();
        }
    }

    static async checkWait() {
        const status = await QStatusModel.findOne({status: QM_STATUSES.WAIT}).exec();
        return !(status === null);
    }

    static async getStatus() {
        return await QStatusModel.findOne({}).exec();
    }
}

export default QMService;
