"use client";

import DeleteButton from "@/app/components/DeleteButton";
import MeetingCard from "@/app/components/MeetingCard";
import { use, useEffect, useState } from "react";
import Members from "./Members";
import GroupStatus from "./GroupStatus";
import Meetings from "./Meetings";
import EditGroupModal from "./EditGroupModal";
import useGroups from "@/app/store/group";
import { useSession } from "next-auth/react";
import { getGroups } from "@/app/services/groups";
import { LoadingSpinner } from "@/app/components/Loading";
import { RiEmotionSadLine } from "@remixicon/react";

const name = "Meninas na computação";
const seniority = "Iniciante";
const integrantes = [
  {
    id: "2",
    birthDate: "2004-06-22",
    email: "gustavobcarvalho22@gmail.com",
    name: "Gustavo Carvalho",
    phone: "+55 (17) 99215-2344",
    school: "UTFPR",
  },
  {
    id: "1",
    birthDate: "2003-06-22",
    email: "gabipassotto@gmail.com",
    name: "Gabriela Passotto",
    phone: "+55 (17) 99215-2344",
    school: "UTFPR",
  },
];

const Grupo = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { groups, setGroups } = useGroups((store) => store);
  const group = groups.find((group) => group._id === id);
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);

  const token = session?.user.token ?? "";

  useEffect(() => {
    const loadGroups = async () => {
      setLoading(true);
      const groupList = await getGroups(session?.user.token ?? "");
      setGroups(groupList);
      setLoading(false);
    };

    if (token && !groups.length) loadGroups();
  }, [token, groups.length]);

  console.log(loading, groups.length);

  if (loading || !groups.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="w-full h-screen text-[22px] flex flex-col font-bold text-darkGrey flex items-center justify-center">
        <RiEmotionSadLine className="h-[50px] w-[50px] mb-2" />
        <h3> Nenhum grupo com esse ID foi encontrado</h3>
      </div>
    );
  }

  return (
    <>
      <EditGroupModal
        open={openEditGroupModal}
        name={name}
        seniority={seniority}
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
            <DeleteButton onClick={() => {}} />
          </div>
        </div>
        <Meetings groupId={id} />
        <GroupStatus activeStatus={group.status?.status} />
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
        <Members members={group.integrantes} grupoId={id} />
      </div>
    </>
  );
};

export default Grupo;
