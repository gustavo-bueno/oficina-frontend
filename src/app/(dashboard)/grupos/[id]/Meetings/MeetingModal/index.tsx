import DeleteButton from "@/app/components/DeleteButton";
import Modal, { ModalProps } from "@/app/components/Modal";
import { MeetingData } from "../CreateMeetingModal";
import Button from "@/app/components/Button";

type MeetingDetailsModalProps = MeetingData &
  Omit<ModalProps, "title"> & { completed: boolean };

const MeetingDetailsModal = ({
  number,
  date,
  subject,
  mentors,
  obs,
  completed,
  ...props
}: MeetingDetailsModalProps) => {
  const deleteModal = () => {
    console.log(number);
  };

  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <Modal {...props} title={`Encontro ${number}`}>
      <div className="relative">
        <DeleteButton
          className="absolute right-[60px] top-[-40px]"
          onClick={deleteModal}
        />
        <p className="text-[18px] text-black font-medium">
          Data: {formattedDate}
        </p>
        <h4 className="text-[18px] font-bold mt-8 text-primary">Tema</h4>
        <p className="text-[22px] text-black font-medium mb-6">{subject}</p>

        <h4 className="text-[18px] font-bold mt-8 text-primary">Mentoras</h4>
        <p className="text-[22px] text-black font-medium mb-6">
          {mentors.join(", ")}.
        </p>

        <h4 className="text-[18px] font-bold mt-8 text-primary">Observações</h4>
        <p className="text-[22px] min-h-[200px] text-black font-medium mb-6">
          {obs}
        </p>

        <div className="flex justify-end">
          {completed ? (
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
