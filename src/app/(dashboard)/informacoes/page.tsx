"use client";

import { RiEmotionSadLine, RiExternalLinkLine } from "@remixicon/react";
import Link from "next/link";
import CreateInfoModal from "./CreateInfoModal";
import { useEffect, useState } from "react";
import InfoModal from "./InfoModal";
import { useSession } from "next-auth/react";
import { GeneralInfo, getGeneralInfos } from "@/app/services/general-info";
import { LoadingSpinner } from "@/app/components/Loading";

const Informacoes = () => {
  const { data: session } = useSession();
  const [showCreateInfoModal, setShowCreateInfoModal] = useState(false);
  const [showInfoDetailsModal, setShowInfoDetailsModal] = useState(false);
  const [infoToOpen, setInfoToOpen] = useState<GeneralInfo>({
    _id: "",
    titulo: "",
    conteudo: "",
  });
  const [notes, setNotes] = useState<Array<GeneralInfo>>([]);
  const [loading, setLoading] = useState(false);

  const token = session?.user.token || "";

  const loadGeneralNotes = async () => {
    setLoading(true);
    const notesList = await getGeneralInfos(token);
    if (notesList) setNotes(notesList);
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      loadGeneralNotes();
    }
  }, [token]);

  return (
    <>
      <CreateInfoModal
        token={token}
        open={showCreateInfoModal}
        close={() => setShowCreateInfoModal(false)}
        onSuccess={() => {
          setShowCreateInfoModal(false);
          loadGeneralNotes();
        }}
      />
      <InfoModal
        token={token}
        onSuccess={() => {
          setShowInfoDetailsModal(false);
          loadGeneralNotes();
        }}
        open={showInfoDetailsModal}
        close={() => setShowInfoDetailsModal(false)}
        {...infoToOpen}
      />
      <div className="pt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-[42px] font-bold">
            Informações Gerais
          </h1>
          <button
            onClick={() => setShowCreateInfoModal(true)}
            className="text-secondary text-[22px] font-bold border-none p-4"
          >
            Adicionar informação
          </button>
        </div>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="flex mb-10 mt-4 items-center text-primary font-bold text-[22px] gap-[8px]"
          href="https://www.technovationbrasil.org/"
        >
          Site Technovation Girls
          <RiExternalLinkLine />
        </Link>

        <div className="flex flex-wrap gap-[24px]">
          {loading ? (
            <LoadingSpinner />
          ) : !notes.length ? (
            <div className="w-full h-full pt-10 text-[22px] flex-col font-bold text-darkGrey flex items-center justify-center">
              <RiEmotionSadLine className="h-[50px] w-[50px] mb-2" />
              <h3> Nenhuma nota geral foi encontrada</h3>
            </div>
          ) : (
            notes.map((info, index) => (
              <button
                key={`info-${index}`}
                onClick={() => {
                  setInfoToOpen(info);
                  setShowInfoDetailsModal(true);
                }}
              >
                <article className="w-[220px] h-[220px] text-start bg-white p-[12px] shadow-custom rounded-lg flex flex-col gap-[24px] justify-between">
                  <h3 className="text-[22px] text-black font-bold">
                    {info.titulo}
                  </h3>
                  <p className="text-grey text-ellipsis overflow-hidden">
                    {info.conteudo}
                  </p>
                </article>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Informacoes;
