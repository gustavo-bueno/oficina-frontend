"use client";

import DeleteButton from "@/app/components/DeleteButton";
import Modal, { ModalProps } from "@/app/components/Modal";
import Button from "@/app/components/Button";
import {
  completeMeeting,
  deleteMeeting,
  Meeting,
} from "@/app/services/meetings";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type MeetingDetailsModalProps = Meeting &
  Omit<ModalProps, "title"> & {
    onSuccess: () => void;
  };

const MeetingDetailsModal = ({
  _id,
  data,
  concluido,
  hora,
  local,
  observacoes,
  tema,
  usuarios,
  onSuccess,
  close,
  ...props
}: MeetingDetailsModalProps) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const token = session?.user.token || "";
  const formattedDate = new Date(data.replaceAll("/", "-")).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
    },
  );
  const mentoras = usuarios.map((usuario) => usuario.nome).join(", ");

  const deleteCurrentMeeting = async () => {
    try {
      const result = await deleteMeeting(_id, token);
      if (result.success) {
        close();
        toast.success("Encontro apagado com sucesso!");
        onSuccess();
      }
    } catch {
      toast.error("Erro ao apagar encontro");
    }
  };

  const markMeetingAsCompleted = async () => {
    setLoading(true);
    try {
      const result = await completeMeeting(_id, token);
      if (result.success) {
        onSuccess();
        toast.success("Encontro concluído");
      } else {
        throw Error("Erro ao atualizar status");
      }
    } catch {
      toast.error("Falha ao concluir encontro. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal close={close} {...props} title={`Encontro (${formattedDate})`}>
      <div className="relative">
        <DeleteButton
          className="absolute right-[60px] top-[-40px]"
          onClick={deleteCurrentMeeting}
        />
        {hora && (
          <p className="text-[18px] text-black font-medium">Hora: {hora}</p>
        )}

        {local && (
          <>
            <h4 className="text-[18px] font-bold mt-8 text-primary">Local</h4>
            <p className="text-[22px] text-black font-medium mb-6">{local}</p>
          </>
        )}

        <h4 className="text-[18px] font-bold mt-8 text-primary">Tema</h4>
        <p className="text-[22px] text-black font-medium mb-6">{tema}</p>

        <h4 className="text-[18px] font-bold mt-8 text-primary">Mentoras</h4>
        <p className="text-[22px] text-black font-medium mb-6">{mentoras}.</p>

        <h4 className="text-[18px] font-bold mt-8 text-primary">Observações</h4>
        <p className="text-[22px] min-h-[200px] text-black font-medium mb-6">
          {observacoes}
        </p>

        <div className="flex justify-end">
          {concluido ? (
            <p className="text-[22px] font-bold text-primary">
              Encontro concluído
            </p>
          ) : (
            <Button loading={loading} onClick={markMeetingAsCompleted}>
              Marcar como feito
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MeetingDetailsModal;
