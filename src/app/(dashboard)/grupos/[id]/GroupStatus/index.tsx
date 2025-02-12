import Status from "@/app/components/Status";
import { useState } from "react";

type GroupStatusProps = {
  activeStatus: string;
};

const GroupStatus = ({ activeStatus }: GroupStatusProps) => {
  const [statuses, setStatuses] = useState([
    { name: "Ideia", position: 1 },
    { name: "Plano de negócio", position: 2 },
    { name: "Desenvolvimento", position: 3 },
    { name: "Prototipação", position: 4 },
    { name: "Vídeo técnico", position: 5 },
    { name: "Pitch", position: 6 },
  ]);

  const activeStatusPosition =
    statuses.find((status) => status.name === activeStatus)?.position ?? 1;

  const updateStatus = (newStatus: string) => {};

  return (
    <div>
      <h2 className="text-[28px] font-bold text-primary">Status</h2>
      <div className="flex gap-[32px] mt-5 mb-10 overflow-x-scroll flex-nowrap pb-1">
        {statuses.map((status, index) => (
          <Status
            key={`status-${index}`}
            name={status.name}
            position={status.position}
            activePosition={activeStatusPosition}
            onClick={() => updateStatus(status.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupStatus;
