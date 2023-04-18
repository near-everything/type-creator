import { request } from "near-social-bridge";

export interface Type {
  accountId: string;
  name: string;
}

interface GetTypesResponse {
  error?: string;
  types?: Type[];
}

interface GetTypesPayload {
  accountId?: string | null;
}

const getTypes = (payload: GetTypesPayload) => {
  return request<GetTypesResponse>("get-types", payload);
};
export default getTypes;
