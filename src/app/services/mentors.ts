import { api } from "./api";

export type Mentora = {
  _id: string;
  nome: string;
  email: string;
  admin: boolean;
};

export const getMentors = async (token: string) => {
  const mentors = await api<Mentora[]>({
    path: "api/usuarios",
    method: "GET",
    token,
  });

  return mentors.filter((mentor: { admin: boolean }) => !mentor.admin);
};
