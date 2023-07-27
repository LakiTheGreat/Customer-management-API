import { JSEND_STATUS } from "../constants";

interface Props {
  status: JSEND_STATUS;
  message: string;
  data?: any;
}

export default function jSendResponse({ status, message, data }: Props) {
  return {
    status,
    message,
    data: data || [],
  };
}
