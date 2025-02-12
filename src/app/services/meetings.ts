import { api } from "./api";

export interface Meeting {
  _id: string;
  data: string;
  hora: string;
  local: string;
  grupoID: string;
  observacoes?: string;
  tema: string;
  concluido: boolean;
  usuarios: [
    {
      nome: string;
    },
  ];
}

type CreateMeetingRequest = {
  data: string;
  hora: string;
  local: string;
  grupoID: string;
  observacoes?: string;
  tema: string;
  usuarios: string[];
  concluido: boolean;
};

export const getGroupMeetings = async (token: string, groupId: string) => {
  const meetings = await api<Meeting[]>({
    path: `api/encontros/${groupId}`,
    method: "GET",
    token,
  });

  return meetings;
};

export const createMeeting = async (
  body: CreateMeetingRequest,
  token: string,
) => {
  const meetings = await api<{
    msg: string;
  }>({
    path: "api/encontros",
    method: "POST",
    body,
    token,
  });

  if (meetings?.msg === "Encontro criado!") return { success: true };

  return { success: false };
};

export const completeMeeting = async (meetingId: string, token: string) => {
  const group = await api<{
    msg: string;
  }>({
    path: `api/encontros/${meetingId}`,
    method: "PUT",
    body: {
      concluido: true,
    },
    token,
  });

  if (group?.msg === "Encontro atualizado!") return { success: true };

  return { success: false };
};

export const deleteMeeting = async (id: string, token: string) => {
  const group = await api<{
    msg: string;
  }>({
    path: `api/encontros/${id}`,
    method: "DELETE",
    token,
  });

  if (group?.msg === "Encontro deletado!") return { success: true };

  return { success: false };
};
