import DeleteButton from "@/app/components/DeleteButton";
import { useState } from "react";
import CreateGroupMemberModal from "./CreateMemberModal";
import MemberDetailsModal from "./MemberDetailsModal";
import { Integrante } from "@/app/services/groups";

type MembersProps = {
  members: Integrante[];
  grupoId: string;
};

const Members = ({ members, grupoId }: MembersProps) => {
  const [openCreateMemberModal, setOpenCreateMemberModal] = useState(false);
  const [openMemberDetailsModal, setOpenMemberDetailsModal] = useState(false);
  const [memberToShow, setMemberToShow] = useState<Integrante>({
    _id: "",
    dataNascimento: "",
    email: "",
    nome: "",
    escola: "",
    telefone: "",
    grupoID: "",
  });

  console.log(members);

  return (
    <div>
      <CreateGroupMemberModal
        groupId={grupoId}
        close={() => setOpenCreateMemberModal(false)}
        open={openCreateMemberModal}
      />
      <MemberDetailsModal
        {...memberToShow}
        close={() => setOpenMemberDetailsModal(false)}
        open={openMemberDetailsModal}
      />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[28px] font-bold text-primary">Integrantes</h2>
        <button
          onClick={() => setOpenCreateMemberModal(true)}
          className="text-[22px] text-secondary font-bold"
        >
          Adicionar integrante
        </button>
      </div>
      <div className="flex flex-col gap-[16px]">
        {members.map((member, index) => (
          <div
            onClick={() => {
              setMemberToShow(member);
              setOpenMemberDetailsModal(true);
            }}
            key={`member-${index}`}
            className="bg-white cursor-pointer font-medium text-black text-[20px] shadow-custom flex items-center justify-between rounded-lg p-[16px]"
          >
            {member.nome}
            <div onClick={(e) => e.stopPropagation()}>
              <DeleteButton
                onClick={() => {
                  console.log("ihul");
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
