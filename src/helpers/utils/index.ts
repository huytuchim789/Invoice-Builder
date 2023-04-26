import type { Dayjs } from 'dayjs/index';
import dayjs from 'dayjs';

export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:4000';

export const dateParser = (dateValue: string | Dayjs | null, outputFormat = 'MMM YYYY') => {
  if (dateValue === null) return;
  const dayjsDate = dayjs(dateValue);
  return dayjsDate.format(outputFormat);
};
