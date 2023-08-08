export enum JSEND_STATUS {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}

export const ROUTES = {
  CUSTOMERS: "customers",
};

export const linkRegex =
  /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:[a-zA-Z0-9-]+\.)+(?:[a-zA-Z]{2,})(?::\d{2,5})?(?:\/[^\s]*)?$/;
