export type DateFormat = {
  label: string;
  value: string;
  fromDate: (date: Date) => string;
  toDate: (value: string) => Date;
  formatMatcher: (date: string) => boolean
};
