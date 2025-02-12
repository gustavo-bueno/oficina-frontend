import { api } from "./api";
import { Status } from "./status";

export interface Grupo {
  _id: string;
  nome: string;
  senioridade: string;
  integrantes: Integrante[];
  status: Status;
  __v: number;
}

export interface Integrante {
  _id: string;
  nome: string;
  dataNascimento: string;
  grupoID: string;
  escola: string;
  email: string;
  telefone: string;
}

export const getGroups = async (token: string) => {
  const groups = await api<Grupo[]>({
    path: "api/grupos",
    method: "GET",
    token,
  });

  return groups;
};

export const createGroup = async (
  body: {
    nome: string;
    senioridade: string;
  },
  token: string,
) => {
  const group = await api<{
    msg: string;
  }>({
    path: "api/grupos",
    method: "POST",
    body,
    token,
  });

  if (group?.msg === "Grupo criado!") return { success: true };

  return { success: false };
};
