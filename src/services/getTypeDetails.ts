import { request } from "near-social-bridge";

export interface Type {
  accountId: string;
  name: string;
}

interface GetTypeDetailsResponse {
  error?: string;
  details?: string;
}

interface GetTypeDetailsPayload {
  type: Type;
}

const getTypeDetails = (payload: GetTypeDetailsPayload) => {
  return request<GetTypeDetailsResponse>("get-type-details", payload);
};
export default getTypeDetails;
