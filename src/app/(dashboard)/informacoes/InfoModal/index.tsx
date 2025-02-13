import DeleteButton from "@/app/components/DeleteButton";
import Modal, { ModalProps } from "@/app/components/Modal";
import { deleteInformation } from "@/app/services/general-info";
import { toast } from "react-toastify";

type InfoModalProps = {
  _id: string;
  token: string;
  titulo: string;
  conteudo: string;
  onSuccess: () => void;
} & Omit<ModalProps, "title">;

const InfoModal = ({
  _id,
  token,
  titulo,
  conteudo,
  onSuccess,
  ...props
}: InfoModalProps) => {
  const deleteModal = async () => {
    try {
      const result = await deleteInformation(_id, token);
      if (result.success) {
        close();
        toast.success("Informação apagada com sucesso!");
        onSuccess();
      }
    } catch {
      toast.error("Erro ao apagar informação");
    }
  };

  return (
    <Modal {...props} title={titulo}>
      <h4 className="text-[22px] font-bold mt-8 mb-4 text-primary">Conteúdo</h4>
      <p className="text-[18px] min-h-[300px] max-h-[500px] overflow-y-auto text-black font-medium">
        {conteudo}
      </p>
      <div className="flex w-full justify-end">
        <DeleteButton className="mt-5 self-end" onClick={deleteModal} />
      </div>
    </Modal>
  );
};

export default InfoModal;
