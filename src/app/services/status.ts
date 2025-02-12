import { api } from "./api";

export interface Status {
  _id: string;
  status: string;
  position: number;
  __v: number;
}

export const getStatuses = async (token: string) => {
  const statuses = await api<Status[]>({
    path: "api/status",
    method: "GET",
    token,
  });

  return statuses.sort((a, b) => a.position - b.position);
};
