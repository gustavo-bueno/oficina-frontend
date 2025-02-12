import DeleteButton from "@/app/components/DeleteButton";
import Modal, { ModalProps } from "@/app/components/Modal";
import { GroupMemberFormData } from "../CreateMemberModal";

type MemberDetailsModalProps = GroupMemberFormData &
  Omit<ModalProps, "title"> & { id: string };

const MemberDetailsModal = ({
  id,
  birthDate,
  email,
  name,
  phone,
  school,
  ...props
}: MemberDetailsModalProps) => {
  const deleteModal = () => {
    console.log(id);
  };

  const formattedDate = new Date(birthDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Modal {...props} title={name}>
      <div className="relative min-h-[400px]">
        <DeleteButton
          className="absolute right-[60px] top-[-40px]"
          onClick={deleteModal}
        />
        <p className="text-[18px] text-black font-medium">
          Data de nascimento: {formattedDate}
        </p>
        <h4 className="text-[18px] font-bold mt-8 text-primary">Escola</h4>
        <p className="text-[22px] text-black font-medium mb-6">{school}</p>

        <h4 className="text-[18px] font-bold mt-8 text-primary">Email</h4>
        <p className="text-[22px] text-black font-medium mb-6">{email}</p>

        <h4 className="text-[18px] font-bold mt-8 text-primary">Telefone</h4>
        <p className="text-[22px] text-black font-medium mb-6">{phone}</p>
      </div>
    </Modal>
  );
};

export default MemberDetailsModal;
