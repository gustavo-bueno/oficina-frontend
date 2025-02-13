import { api } from "./api";

export type GeneralInfo = {
  _id: string;
  titulo: string;
  conteudo: string;
};

export const getGeneralInfos = async (token: string) => {
  const informacoes = await api<GeneralInfo[]>({
    path: "api/informacoes",
    method: "GET",
    token,
  });

  return informacoes;
};

export const createInformation = async (
  body: {
    titulo: string;
    conteudo: string;
  },
  token: string,
) => {
  const group = await api<{
    msg: string;
  }>({
    path: "api/informacoes",
    method: "POST",
    body,
    token,
  });

  if (group?.msg === "Informação criada!") return { success: true };

  return { success: false };
};

export const deleteInformation = async (id: string, token: string) => {
  const group = await api<{
    msg: string;
  }>({
    path: `api/informacoes/${id}`,
    method: "DELETE",
    token,
  });

  if (group?.msg === "Informação deletada!") return { success: true };

  return { success: false };
};
