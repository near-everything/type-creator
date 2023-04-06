import { request } from "near-social-bridge";

interface SignCardResponse {
  error?: string;
}

interface SignCardPayload {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  sponsor: string,
  consent: boolean;
}

const createThing = (payload: SignCardPayload) => {
  return request<SignCardResponse>("sign-card", payload);
};
export default createThing;
