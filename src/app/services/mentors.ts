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

export const inviteMentor = async (
  body: {
    nome: string;
    email: string;
  },
  token: string,
) => {
  const mentor = await api<{
    objUsuario: Mentora;
  }>({
    path: "api/usuarios",
    method: "POST",
    body: {
      ...body,
      senha: "0",
      admin: false,
    },
    token,
  });

  if (mentor?.objUsuario?._id) return { success: true, ...mentor.objUsuario };

  return { success: false };
};

export const deleteMentor = async (id: string, token: string) => {
  const mentor = await api<{
    msg: string;
  }>({
    path: `api/usuarios/${id}`,
    method: "DELETE",
    token,
  });

  if (mentor?.msg === "Usuário deletado!") return { success: true };
  return { success: false };
};
