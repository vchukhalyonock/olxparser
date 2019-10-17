import Error from '../core/Error';

export default (req, res, next) => {
    next(new Error('Resource not found', 404));
}