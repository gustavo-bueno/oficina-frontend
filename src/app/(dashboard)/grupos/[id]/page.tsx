"use client";

import DeleteButton from "@/app/components/DeleteButton";
import { use, useEffect, useState } from "react";
import Members from "./Members";
import GroupStatus from "./GroupStatus";
import Meetings from "./Meetings";
import EditGroupModal from "./EditGroupModal";
import useGroups from "@/app/store/group";
import { useSession } from "next-auth/react";
import { deleteGroup, getGroups } from "@/app/services/groups";
import { LoadingSpinner } from "@/app/components/Loading";
import { RiEmotionSadLine } from "@remixicon/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Grupo = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const { groups, setGroups } = useGroups((store) => store);
  const router = useRouter();

  const group = groups.find((group) => group._id === id);
  const token = session?.user.token ?? "";

  const loadGroups = async () => {
    setLoading(true);
    const groupList = await getGroups(session?.user.token ?? "");
    setGroups(groupList);
    setLoading(false);
  };

  const deleteCurrentGroup = async () => {
    try {
      const result = await deleteGroup(id, token);
      if (result.success) {
        toast.success("Grupo apagado com sucesso!");
        await loadGroups();
        router.push("/grupos");
      }
    } catch {
      toast.error("Erro ao apagar grupo");
    }
  };

  useEffect(() => {
    if (token && !groups.length) loadGroups();
  }, [token, groups.length]);

  if (loading || !groups.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="w-full h-screen text-[22px] flex-col font-bold text-darkGrey flex items-center justify-center">
        <RiEmotionSadLine className="h-[50px] w-[50px] mb-2" />
        <h3> Nenhum grupo com esse ID foi encontrado</h3>
      </div>
    );
  }

  return (
    <>
      <EditGroupModal
        groupId={id}
        onSuccess={async () => {
          setOpenEditGroupModal(false);
          await loadGroups();
        }}
        open={openEditGroupModal}
        name={group.nome}
        seniority={group.senioridade}
        close={() => setOpenEditGroupModal(false)}
      />
      <div className="py-10">
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-black text-[42px] font-bold">{group.nome}</h1>
          <div className="flex items-center gap-[32px]">
            <button
              onClick={() => setOpenEditGroupModal(true)}
              className="text-primary text-[22px] font-bold border-none p-4"
            >
              Editar grupo
            </button>
            <DeleteButton onClick={deleteCurrentGroup} />
          </div>
        </div>
        <Meetings groupId={id} />
        <GroupStatus groupId={id} activeStatus={group.status?.status} />
        {group.senioridade && (
          <>
            <h2 className="text-[28px] font-bold text-primary mb-2">
              Senioridade
            </h2>
            <p className="font-medium text-[22px] text-black mb-10">
              {group.senioridade}
            </p>
          </>
        )}
        <Members
          members={group.integrantes}
          grupoId={id}
          reloadMembers={() => loadGroups()}
        />
      </div>
    </>
  );
};

export default Grupo;
