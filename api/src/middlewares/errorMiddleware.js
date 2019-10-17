import { isPlainObject } from 'lodash';
import Error from '../core/Error';

export default (err, req, res, next) => {
    if (err instanceof Error) {
        return res
            .status(err.status)
            .json({
                status: err.status,
                errors: isPlainObject(err.statusMessage)
                    ? err.statusMessage
                    : err.statusMessage.toString()
            })
    }

    return res
        .status(500)
        .json({
            errors: err.toString()
        });
}