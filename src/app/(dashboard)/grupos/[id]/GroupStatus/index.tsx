"use client";

import Status from "@/app/components/Status";
import { getStatuses } from "@/app/services/status";
import useGroups from "@/app/store/group";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type GroupStatusProps = {
  activeStatus: string;
};

const GroupStatus = ({ activeStatus }: GroupStatusProps) => {
  const { statuses, setStatuses } = useGroups((store) => store);
  const { data: session } = useSession();
  const token = session?.user.token ?? "";

  useEffect(() => {
    const loadStatus = async () => {
      const statusList = await getStatuses(token);
      if (statusList) {
        setStatuses(statusList);
      }
    };

    if (!statuses.length && token) {
      loadStatus();
    }
  }, [statuses.length, token]);

  const activeStatusPosition =
    statuses.find((status) => status.status === activeStatus)?.position ??
    statuses[0]?.position;

  console.log(activeStatusPosition);

  const updateStatus = (newStatus: string) => {};

  if (!statuses.length) return null;

  return (
    <div>
      <h2 className="text-[28px] font-bold text-primary">Status</h2>
      <div className="flex gap-[32px] mt-5 mb-10 overflow-x-auto flex-nowrap pb-1">
        {statuses.map((status, index) => (
          <Status
            key={status._id}
            name={status.status}
            position={status.position}
            activePosition={activeStatusPosition}
            onClick={() => updateStatus(status.status)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupStatus;
