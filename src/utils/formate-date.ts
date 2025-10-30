import { format, parseISO } from "date-fns";

export const formateDate = (date: string) =>
  format(parseISO(date), "dd/MM/yyyy");
