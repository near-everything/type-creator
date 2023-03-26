import request from "near-social-bridge/request";

interface CreateThingResponse {
  error?: string;
}

interface CreateThingPayload {
  name: string;
}

const createThing = (payload: CreateThingPayload) => {
  return request<CreateThingResponse>("create-thing", payload);
};
export default createThing;
