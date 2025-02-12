import { api } from "./api";

export interface Meeting {
  _id: string;
  data: string;
  hora: string;
  local: string;
  grupoID: string;
  observacoes: string;
  tema: string;
  concluido: boolean;
  usuarios: string[];
}

export const getGroupMeetings = async (token: string, groupId: string) => {
  const meetings = await api<Meeting[]>({
    path: `api/encontros/${groupId}`,
    method: "GET",
    token,
  });

  // const encontrosConcluidos = meetings.filter((encontro) => encontro.concluido);
  // const cronograma = meetings.filter((encontro) => !encontro.concluido);

  return meetings;
};
