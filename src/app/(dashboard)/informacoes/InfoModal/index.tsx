import DeleteButton from "@/app/components/DeleteButton";
import Modal, { ModalProps } from "@/app/components/Modal";

type InfoModalProps = {
  id: string;
  content: string;
} & ModalProps;

const InfoModal = ({ id, title, content, ...props }: InfoModalProps) => {
  const deleteModal = () => {
    console.log(id);
  };

  return (
    <Modal {...props} title={title}>
      <h4 className="text-[22px] font-bold mt-8 mb-4 text-primary">Conteúdo</h4>
      <p className="text-[18px] min-h-[300px] max-h-[500px] overflow-y-auto text-black font-medium">
        {content}
      </p>
      <div className="flex w-full justify-end">
        <DeleteButton className="mt-5 self-end" onClick={deleteModal} />
      </div>
    </Modal>
  );
};

export default InfoModal;
