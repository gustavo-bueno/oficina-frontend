import Button from "../Button";
import Modal, { ModalProps } from "../Modal";

type DeleteModalProps = {
  onDeleteClick: () => void;
} & ModalProps;

const DeleteModal = ({ onDeleteClick, ...props }: DeleteModalProps) => {
  return (
    <Modal {...props}>
      <p className="text-black mb-10 mt-4">Essa ação é irreversivel.</p>
      <div className="flex items-center justify-end gap-[32px]">
        <button className="border-primary h-[52px] rounded-lg px-[32px] font-bold text-[18px] text-primary bg-transparent border-2">
          Cancelar
        </button>
        <Button className="bg-red-500">Apagar</Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
