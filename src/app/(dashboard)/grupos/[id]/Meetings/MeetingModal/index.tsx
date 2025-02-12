import DeleteButton from "@/app/components/DeleteButton";
import Modal, { ModalProps } from "@/app/components/Modal";
import Button from "@/app/components/Button";
import { Meeting } from "@/app/services/meetings";

type MeetingDetailsModalProps = Meeting & Omit<ModalProps, "title">;

const MeetingDetailsModal = ({
  _id,
  data,
  concluido,
  hora,
  local,
  observacoes,
  tema,
  usuarios,
  ...props
}: MeetingDetailsModalProps) => {
  const deleteModal = () => {
    console.log(_id);
  };

  const formattedDate = new Date(data.replaceAll("/", "-")).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
    },
  );

  return (
    <Modal {...props} title={`Encontro (${formattedDate})`}>
      <div className="relative">
        <DeleteButton
          className="absolute right-[60px] top-[-40px]"
          onClick={deleteModal}
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
        <p className="text-[22px] text-black font-medium mb-6">
          {usuarios.join(", ")}.
        </p>

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
            <Button onClick={() => {}}>Marcar como feito</Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MeetingDetailsModal;
