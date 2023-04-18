import { request } from "near-social-bridge";
import { Property } from "../components/FormBuilder";
import { Widgets } from "../screens/View";

export interface Type {
  accountId: string;
  name: string;
}

export interface TypeDetails {
  properties: Property[];
  widgets?: Widgets;
}

interface GetTypeDetailsResponse {
  error?: string;
  details?: TypeDetails;
}

interface GetTypeDetailsPayload {
  type: Type;
}

const getTypeDetails = (payload: GetTypeDetailsPayload) => {
  return request<GetTypeDetailsResponse>("get-type-details", payload);
};
export default getTypeDetails;
