import { request } from "near-social-bridge";
import { Property } from "../components/FormBuilder";
import { Widgets } from "../screens/View";

interface CreateTypeResponse {
  error?: string;
  success?: boolean;
}

interface CreateTypePayload {
  name: string,
  properties: Property[],
  widgets: Widgets
}

const createType = (payload: CreateTypePayload) => {
  return request<CreateTypeResponse>("create-type", payload);
};
export default createType;
