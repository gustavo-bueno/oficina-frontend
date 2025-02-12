import DeleteButton from "@/app/components/DeleteButton";
import Modal, { ModalProps } from "@/app/components/Modal";
import { Integrante } from "@/app/services/groups";

type MemberDetailsModalProps = Integrante & Omit<ModalProps, "title">;

const MemberDetailsModal = ({
  _id,
  dataNascimento,
  email,
  nome,
  telefone,
  escola,
  ...props
}: MemberDetailsModalProps) => {
  const deleteModal = () => {
    console.log(_id);
  };

  const formattedDate = new Date(dataNascimento).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Modal {...props} title={nome}>
      <div className="relative min-h-[400px]">
        <DeleteButton
          className="absolute right-[60px] top-[-40px]"
          onClick={deleteModal}
        />
        <p className="text-[18px] text-black font-medium">
          Data de nascimento: {formattedDate}
        </p>
        <h4 className="text-[18px] font-bold mt-8 text-primary">Escola</h4>
        <p className="text-[22px] text-black font-medium mb-6">{escola}</p>

        <h4 className="text-[18px] font-bold mt-8 text-primary">Email</h4>
        <p className="text-[22px] text-black font-medium mb-6">{email}</p>

        <h4 className="text-[18px] font-bold mt-8 text-primary">Telefone</h4>
        <p className="text-[22px] text-black font-medium mb-6">{telefone}</p>
      </div>
    </Modal>
  );
};

export default MemberDetailsModal;
