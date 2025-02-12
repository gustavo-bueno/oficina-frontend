"use client";

import DeleteButton from "@/app/components/DeleteButton";
import MeetingCard from "@/app/components/MeetingCard";
import { useState } from "react";
import Members from "./Members";
import GroupStatus from "./GroupStatus";
import Meetings from "./Meetings";
import EditGroupModal from "./EditGroupModal";

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

const Grupo = () => {
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);

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
          <h1 className="text-black text-[42px] font-bold">{name}</h1>
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
        <Meetings groupId="1" />
        <GroupStatus activeStatus="Prototipação" />
        <h2 className="text-[28px] font-bold text-primary mb-2">Senioridade</h2>
        <p className="font-medium text-[22px] text-black mb-10">{seniority}</p>
        <Members members={integrantes} />
      </div>
    </>
  );
};

export default Grupo;
