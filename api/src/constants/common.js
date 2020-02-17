import { REQUEST_STATUS } from "../models/ImportRequestModel";

export const FILTER_IMPORT_REQUESTS = {
    ALL: 'all',
    HOUR_REQUESTED: 'hour_requested',
    DAY_REQUESTED: 'day_requested',
    MONTH_REQUESTED: 'month_requested',
    HOUR_PROCESSED: 'hour_processed',
    DAY_PROCESSED: 'day_processed',
    MONTH_PROCESSED: 'month_processed',
    PENDING: REQUEST_STATUS.PENDING,
    IN_PROGRESS: REQUEST_STATUS.IN_PROGRESS
};
