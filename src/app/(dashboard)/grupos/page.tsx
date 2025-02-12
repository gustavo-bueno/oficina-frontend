"use client";

import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import Link from "next/link";

function getRandomColor() {
  const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

const Grupos = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [groups, setGroups] = useState([
    {
      id: "1",
      name: "Meninas na computação",
      status: "Pitch",
      members: ["oi", "tudo", "certo"],
    },
  ]);

  return (
    <>
      <CreateGroupModal
        open={showCreateGroupModal}
        close={() => setShowCreateGroupModal(false)}
      />
      <div className="pt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-[42px] font-bold">Grupos</h1>
          <button
            onClick={() => setShowCreateGroupModal(true)}
            className="text-primary text-[22px] font-bold border-none p-4"
          >
            Criar grupo
          </button>
        </div>
        <div className="flex flex-wrap gap-[32px] mt-10">
          {groups.map((group) => (
            <Link key={group.id} href={`/grupos/${group.id}`}>
              <div className="w-[300px] h-[300px] bg-white p-[12px] shadow-custom rounded-lg flex flex-col justify-between">
                <div className="flex items-center gap-[6px] justify-between">
                  <p className="text-[22px] text-black font-bold">
                    {group.name}
                  </p>
                  <div
                    style={{ background: getRandomColor() }}
                    className="font-bold text-black rounded-full w-[120px] h-[30px] flex items-center justify-center"
                  >
                    {group.status}
                  </div>
                </div>
                <span className="text-grey">
                  {group.members.length}{" "}
                  {group.members.length > 1 ? "integrantes" : "integrante"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grupos;
