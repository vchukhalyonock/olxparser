export const IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT = 3000;
export const EMAIL_VALIDATE_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
export const PHONE_VALIDATE_REGEX = /([0-9-+()\s]+)$/g;
export const OLX_URL_VALIDATE_REGEXP = /^(http|https):\/\/(\w+\.)?(olx\.ua)(\/.*)?$/g;


export const filterItems = [
    { value: 'all', option: "All" },
    { value: 'hour_requested', option: 'Last Hour Requested' },
    { value: 'day_requested', option: 'Last Day Requested' },
    { value: 'month_requested', option: 'Last Month Requested' },
    { value: 'hour_processed', option: 'Last Hour Processed' },
    { value: 'day_processed', option: 'Last Day Processed' },
    { value: 'month_processed', option: 'Last Month Processed' }
];
