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

export const createGroupMember = async (
  body: Omit<Integrante, "_id">,
  token: string,
) => {
  const group = await api<{
    msg: string;
  }>({
    path: "api/integrantes",
    method: "POST",
    body,
    token,
  });

  if (group?.msg === "Integrante criado!") return { success: true };

  return { success: false };
};

export const updateGroupStatus = async (
  {
    statusId,
    groupId,
  }: {
    statusId: string;
    groupId: string;
  },
  token: string,
) => {
  const group = await api<{
    msg: string;
  }>({
    path: `api/grupos/${groupId}`,
    method: "PUT",
    body: {
      status: statusId,
    },
    token,
  });

  if (group?.msg === "Grupo atualizado!") return { success: true };

  return { success: false };
};

export const deleteGroup = async (id: string, token: string) => {
  const group = await api<{
    msg: string;
  }>({
    path: `api/grupos/${id}`,
    method: "DELETE",
    token,
  });

  if (group?.msg === "Grupo deletado!") return { success: true };

  return { success: false };
};

export const deleteGroupMember = async (id: string, token: string) => {
  const group = await api<{
    msg: string;
  }>({
    path: `api/integrantes/${id}`,
    method: "DELETE",
    token,
  });

  if (group?.msg === "Integrante deletado!") return { success: true };

  return { success: false };
};

export const updateGroup = async (
  body: {
    nome: string;
    senioridade: string;
  },
  groupId: string,
  token: string,
) => {
  const group = await api<{
    msg: string;
  }>({
    path: `api/grupos/${groupId}`,
    method: "PUT",
    body,
    token,
  });

  if (group?.msg === "Grupo atualizado!") return { success: true };

  return { success: false };
};
