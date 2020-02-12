import moment from "moment";

export const getLastHourDate = () => moment().subtract(1, 'hour');

export const getLastDayDate = () => moment().subtract(1, 'day');

export const getLastMonthDate = () => moment().subtract(1, 'month');
