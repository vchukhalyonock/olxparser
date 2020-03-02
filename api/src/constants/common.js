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
    IN_PROGRESS: REQUEST_STATUS.IN_PROGRESS,
    ERROR: REQUEST_STATUS.ERROR,
    NEW: REQUEST_STATUS.NEW,
    DONE: REQUEST_STATUS.DONE
};


export const FILTER_HEADINGS = {
    ALL: "all",
    HOUR: 'hour',
    DAY: 'day',
    MONTH: 'month'
};

export const PHONE_REG = /^[0-9]{1,11}$/gm;
export const EMAIL_VALIDATE_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
export const OLX_URL_VALIDATE_REGEXP = /^(http|https):\/\/(\w+\.)?(olx\.ua)(\/.*)?$/g;
