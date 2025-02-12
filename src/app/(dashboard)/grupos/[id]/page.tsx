"use client";

import DeleteButton from "@/app/components/DeleteButton";
import MeetingCard from "@/app/components/MeetingCard";
import Status from "@/app/components/Status";

const integrantes = [
  {
    name: "Gabriela Passotto",
  },
  {
    name: "Gustavo Carvalho",
  },
  {
    name: "Marcos Prestes",
  },
];

const statuses = [
  { name: "Ideia", position: 1 },
  { name: "Plano de negócio", position: 2 },
  { name: "Desenvolvimento", position: 3 },
  { name: "Prototipação", position: 4 },
  { name: "Vídeo técnico", position: 5 },
  { name: "Pitch", position: 6 },
];

const activeStatusPosition = 4;

const Grupo = () => {
  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-16">
        <h1 className="text-black text-[42px] font-bold">
          Meninas na computação
        </h1>
        <div className="flex items-center gap-[32px]">
          <button className="text-primary text-[22px] font-bold border-none p-4">
            Editar grupo
          </button>
          <DeleteButton onClick={() => {}} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-bold text-primary">Cronograma</h2>
        <button className="text-[22px] text-secondary font-bold">
          Adicionar encontro
        </button>
      </div>
      <div className="flex flex-wrap gap-[32px] mt-5 mb-10 overflow-x-auto pb-1">
        <MeetingCard
          number={1}
          date={new Date()}
          subject="Plano de negócios"
          mentors={["Gustavo"]}
        />
      </div>
      <h2 className="text-[28px] font-bold text-primary">
        Encontros concluídos
      </h2>
      <div className="flex flex-wrap gap-[32px] mt-5 mb-10 overflow-x-auto pb-1">
        <MeetingCard
          number={1}
          date={new Date()}
          subject="Plano de negócios"
          mentors={["Gustavo"]}
          completed
        />
        <MeetingCard
          number={1}
          date={new Date()}
          subject="Plano de negócios"
          mentors={["Gustavo"]}
          completed
        />
      </div>
      <h2 className="text-[28px] font-bold text-primary">Status</h2>
      <div className="flex gap-[32px] mt-5 mb-10 overflow-x-scroll flex-nowrap pb-1">
        {statuses.map((status, index) => (
          <Status
            key={`status-${index}`}
            name={status.name}
            position={status.position}
            activePosition={activeStatusPosition}
          />
        ))}
      </div>
      <h2 className="text-[28px] font-bold text-primary mb-2">Senioridade</h2>
      <p className="font-medium text-[22px] text-black mb-10">Iniciante</p>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[28px] font-bold text-primary">Integrantes</h2>
        <button className="text-[22px] text-secondary font-bold">
          Adicionar integrante
        </button>
      </div>
      <div className="flex flex-col gap-[16px]">
        {integrantes.map((member, index) => (
          <div
            key={`member-${index}`}
            className="bg-white font-medium text-black text-[20px] shadow-custom flex items-center justify-between rounded-lg p-[16px]"
          >
            {member.name}
            <DeleteButton onClick={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grupo;
