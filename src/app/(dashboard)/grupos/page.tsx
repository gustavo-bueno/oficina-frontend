"use client";

import { useEffect, useState } from "react";
import CreateGroupModal from "./CreateGroupModal";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getGroups, Grupo } from "@/app/services/groups";
import useGroups from "@/app/store/group";
import { LoadingSpinner } from "@/app/components/Loading";

function getRandomColor() {
  const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

const Grupos = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const { groups, setGroups } = useGroups((store) => store);

  const token = session?.user.token ?? "";

  const loadGroups = async () => {
    setLoading(true);
    const groupList = await getGroups(session?.user.token ?? "");
    setGroups(groupList);
    setLoading(false);
  };

  useEffect(() => {
    if (token && !groups.length) loadGroups();
  }, [token, groups.length]);

  return (
    <>
      <CreateGroupModal
        open={showCreateGroupModal}
        close={() => setShowCreateGroupModal(false)}
        onSuccess={async () => {
          setShowCreateGroupModal(false);
          await loadGroups();
        }}
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
          {loading && <LoadingSpinner />}
          {groups.map((group) => (
            <Link key={group._id} href={`/grupos/${group._id}`}>
              <div className="w-[300px] h-[300px] bg-white p-[12px] shadow-custom rounded-lg flex flex-col justify-between">
                <div className="flex items-start gap-[12px] justify-between">
                  <p className="text-[22px] text-black font-bold">
                    {group.nome}
                  </p>
                  {group.status?.status && (
                    <div
                      style={{ background: getRandomColor() }}
                      className="font-bold text-black mt-1 rounded-full min-w-[120px] px-4 min-h-[30px] flex items-center justify-center"
                    >
                      {group.status.status}
                    </div>
                  )}
                </div>
                <span className="text-grey">
                  {group.integrantes.length}{" "}
                  {group.integrantes.length === 1
                    ? "integrante"
                    : "integrantes"}
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
