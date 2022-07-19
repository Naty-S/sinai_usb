import type { RequestHandler } from "@sveltejs/kit";
import { api } from "../_api";

export const get: RequestHandler = ({request}) => {
  return api(request);
}
