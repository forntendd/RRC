import { apiRequest } from "./client";

export function syncUser() {
  return apiRequest("/auth/sync-user", {
    method: "POST",
  });
}
