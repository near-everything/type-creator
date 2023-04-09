import { request } from "near-social-bridge";
import { Property } from "../components/FormBuilder";

interface CreateTypeResponse {
  error?: string;
  success?: boolean;
}

interface CreateTypePayload {
  name: string,
  properties: Property[]
}

const createType = (payload: CreateTypePayload) => {
  return request<CreateTypeResponse>("create-type", payload);
};
export default createType;
