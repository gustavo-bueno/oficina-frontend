"use client";

import { RiExternalLinkLine } from "@remixicon/react";
import Link from "next/link";
import CreateInfoModal from "./CreateInfoModal";
import { useState } from "react";
import InfoModal from "./InfoModal";

type Info = {
  id: string;
  title: string;
  content: string;
};

const Informacoes = () => {
  const [showCreateInfoModal, setShowCreateInfoModal] = useState(false);
  const [showInfoDetailsModal, setShowInfoDetailsModal] = useState(false);
  const [infoToOpen, setInfoToOpen] = useState<Info>({
    id: "",
    title: "",
    content: "",
  });
  const [infos, setInfos] = useState<Array<Info>>([
    {
      id: "1",
      title: "Sala de para encontros",
      content: " Disponíveis: P104, P105, P106, P202",
    },
    {
      id: "2",
      title: "Templates Canva",
      content: " Disponível em https://www.canva.com/templates/",
    },
  ]);

  return (
    <>
      <CreateInfoModal
        open={showCreateInfoModal}
        close={() => setShowCreateInfoModal(false)}
      />
      <InfoModal
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
          {infos.map((info, index) => (
            <button
              key={`info-${index}`}
              onClick={() => {
                setInfoToOpen(info);
                setShowInfoDetailsModal(true);
              }}
            >
              <article className="w-[220px] h-[220px] text-start bg-white p-[12px] shadow-custom rounded-lg flex flex-col justify-between">
                <h3 className="text-[22px] text-black font-bold">
                  {info.title}
                </h3>
                <p className="text-grey text-ellipsis overflow-hidden">
                  {info.content}
                </p>
              </article>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Informacoes;
