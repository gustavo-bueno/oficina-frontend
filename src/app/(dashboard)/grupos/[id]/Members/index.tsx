"use client";

import DeleteButton from "@/app/components/DeleteButton";
import { useState } from "react";
import CreateGroupMemberModal from "./CreateMemberModal";
import MemberDetailsModal from "./MemberDetailsModal";
import { deleteGroupMember, Integrante } from "@/app/services/groups";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type MembersProps = {
  members: Integrante[];
  grupoId: string;
  reloadMembers: () => void;
};

const Members = ({ members, grupoId, reloadMembers }: MembersProps) => {
  const { data: session } = useSession();
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

  const token = session?.user.token || "";

  const deleteMember = async (id: string) => {
    try {
      const result = await deleteGroupMember(id, token);
      if (result.success) {
        toast.success("Integrante apagada com sucesso!");
        reloadMembers();
      }
    } catch {
      toast.error("Erro ao apagar integrante");
    }
  };

  return (
    <div>
      <CreateGroupMemberModal
        groupId={grupoId}
        close={() => setOpenCreateMemberModal(false)}
        open={openCreateMemberModal}
        onSuccess={reloadMembers}
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
              <DeleteButton onClick={() => deleteMember(member._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
